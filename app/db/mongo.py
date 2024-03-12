from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import os

class MongoDatabase:
    _instance = None

    def __new__(cls) -> MongoClient:
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            uri = os.environ.get('MONGO_URI')
            cls._instance.client = MongoClient(uri, server_api=ServerApi('1'))
            try:
                cls._instance.client.admin.command('ping')
                print("Pinged your deployment. You successfully connected to MongoDB!")
            except Exception as e:
                print(e)
        return cls._instance
