import sys 
import requests
from datetime import datetime


endpoint = sys.argv[1]
seq = "&seq=" + str(sys.argv[2])
cc = sys.argv[3]

headers = {"content-type": "text/plain"}
ingestion_url = endpoint + seq 

time = datetime.utcnow().strftime("%Y-%m-%dT%H:%M:%S.%f")[:-3]

post = time + "\n" + cc + "\n"
print(post)
resp = requests.post(url=ingestion_url, data=post.encode("utf-8"), headers=headers)

print(resp.status_code, resp.text)
