# Project Structure

```text
.
|-- index.html                 # home page entry, kept at root for SEO
|-- pages/                     # all secondary HTML pages
|-- assets/
|   |-- css/                   # styles
|   |-- data/                  # frontend static data and generated JS data
|   `-- js/                    # page scripts
|-- backend/
|   `-- backend.py             # Python crawler, summarizer and scheduler
|-- data/                      # generated JSON and scheduler state
|-- docs/                      # project docs
|-- robots.txt
|-- sitemap.xml
|-- .env.example
`-- .env                       # local secrets, do not commit
```

Run locally:

```bash
python backend/backend.py
```
