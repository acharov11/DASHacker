import firebase_admin
from firebase_admin import credentials, db

cred = credentials.Certificate("C:\\data\\dev\\Hackathon\\key\\serviceAccountKey.json")
firebase_admin.initialize_app(cred, {"databaseURL":"https://das-hackers-default-rtdb.firebaseio.com/"})

ref = db.reference('/')
print(ref.get())

danny_ref = db.reference('/Danny')
print(danny_ref.get())




