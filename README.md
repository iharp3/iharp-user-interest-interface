# iharp-user-interest-interface
The interface will facilitate user interest input by allowing users to choose regions of interest on a map and select the temporal and spatial resolution for that region.

## Implementation
Using React with Vite for the frontend and Django for the backend.

## Set-up React Frontend

Install necessary packages:

    cd userinterestfrontend
    npm install --legacy-peer-deps

Run the frontend:

    npm run dev 

The map functionality is in `src/components/Map.jsx`, the render components are in `src/App.jsx`. Packaged dependancies will be managed by `package.json`, which is created automatically when `npm create vite` is called.

## Set-up Django Backend

Start virtual environment:

    python -m venv venv
    source venv/bin/activate
    pip install --upgrade pip
    pip install -r requirements.txt

Or alternatively:

    bash init_venv.sh

Run the backend:

    cd backend
    python manage.py makemigrations
    python manage.py migrate
    python manage.py runserver

Backend directory structure:

    iharp-user-interest-interface
    ├── frontend/
    │   ├── public/
    │   ├── __init__.py
    │   ├── ...
    ├── backend/
    │   ├── __init__.py
    │   ├── asgi.py
    │   ├── settings.py
    │   ├── urls.py
    │   ├── ...
    │   └── wsgi.py
    ├── README.md
    ├── init_venv.sh
    └── requirements.txt


Package dependancies are managed with the `requirenments.txt` file. 
