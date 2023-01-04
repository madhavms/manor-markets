from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
import sqlite3
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from fastapi.middleware.cors import CORSMiddleware
import bcrypt
from jwt import encode
from datetime import datetime, timedelta
import json


app = FastAPI()
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DATABASE_URL = "sqlite:///./test.db"
SECRET_KEY = "HDYEJE12234"

engine = create_engine(DATABASE_URL)
Session = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    username = Column(String, index=True, unique=True)
    password_hash = Column(String)


Base.metadata.create_all(bind=engine)


class UserCreate(BaseModel):
    username: str
    password: str


class UserOut(BaseModel):
    id: int
    username: str


class Credentials(BaseModel):
    username: str
    password: str


@app.post("/users/", response_model=UserOut)
def create_user(user: UserCreate):
    session = Session()
    existing_user = session.query(User).filter(
        User.username == user.username).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Username already exists")
    new_user = User(username=user.username,
                    password_hash=generate_password_hash(user.password))
    session.add(new_user)
    session.commit()
    return UserOut(id=new_user.id, username=new_user.username)


@app.post("/login")
def login(credentials: Credentials):
    user = authenticate_user(credentials.username, credentials.password)
    if not user:
        raise HTTPException(
            status_code=401, detail="Incorrect username or password")
    print(f'The user id is {user.id}')
    return {"access_token": create_access_token(user.id)}


def authenticate_user(username: str, password: str):
    session = Session()
    user = session.query(User).filter(User.username == username).first()
    if not user:
        return None
    if not bcrypt.checkpw(password.encode(), user.password_hash.encode()):
        return None
    return user


def generate_password_hash(password: str):
    return bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()


def create_access_token(user_id: int):
    payload = {
        "user_id": user_id,
        "exp": datetime.utcnow() + timedelta(minutes=15)
    }
    secret_key = bytes(SECRET_KEY, "utf-8")
    encoded_jwt = encode(payload, secret_key, algorithm="HS256")
    return encoded_jwt
