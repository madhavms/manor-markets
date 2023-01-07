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
import secrets


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

# define a new model for the refresh token


class RefreshToken(Base):
    __tablename__ = "refresh_tokens"

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer)
    token = Column(String, unique=True)


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

# define a request model for the refresh token endpoint


class RefreshTokenRequest(BaseModel):
    refresh_token: str

# define a response model for the refresh token endpoint


class RefreshTokenResponse(BaseModel):
    access_token: str


@app.post("/users/", response_model=UserOut)
def create_user(user: UserCreate):
    session = Session()
    existing_user = session.query(User).filter(
        User.username == user.username).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Username already exists")
    new_user = User(username=user.username,
                    password_hash=generate_password_hash(user.password)
                    )
    session.add(new_user)
    session.commit()
    # generate a refresh token for the new user
    refresh_token = generate_refresh_token(new_user)
    return {
        "id": new_user.id,
        "username": new_user.username
    }


@app.post("/login")
def login(credentials: Credentials):
    user = authenticate_user(credentials.username, credentials.password)
    if not user:
        raise HTTPException(
            status_code=401, detail="Incorrect username or password")
    print(f'The user id is {user.id}')
    return {"access_token": create_access_token(user.id), "refresh_token": get_token_from_user(user.id)}


@app.post("/refresh-token")
def refresh_token(request: RefreshTokenRequest):
    print("request=", request)
    session = Session()
    refresh_token = session.query(RefreshToken).filter(
        RefreshToken.token == request.refresh_token).first()
    if not refresh_token:
        raise HTTPException(status_code=401, detail="Invalid refresh token")
    user = session.query(User).get(refresh_token.user_id)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid refresh token")
    access_token = create_access_token(user.id)
    print("access_token=", access_token)
    return {"access_token": access_token}


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
        "exp": datetime.utcnow() + timedelta(seconds=10)
    }
    secret_key = bytes(SECRET_KEY, "utf-8")
    encoded_jwt = encode(payload, secret_key, algorithm="HS256")
    return encoded_jwt


def get_token_from_user(user_id: int):
    session = Session()
    token = session.query(RefreshToken).filter(
        RefreshToken.user_id == user_id).first()
    return token


def generate_refresh_token(user: User):
    session = Session()
    # check if the user already has a refresh token
    existing_token = session.query(RefreshToken).filter(
        RefreshToken.user_id == user.id).first()
    if existing_token:
        # if the user already has a refresh token, delete it
        session.delete(existing_token)
        session.commit()
    # create a new refresh token
    new_token = RefreshToken(user_id=user.id, token=secrets.token_hex(32))
    session.add(new_token)
    session.commit()
    return new_token.token
