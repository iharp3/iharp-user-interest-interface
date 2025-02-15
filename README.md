# iharp-user-interest-interface
The interface will facilitate user interest input by allowing users to choose regions of interest on a map and select the temporal and spatial resolution for that region.

## Implementation
We will use React with Vite for the frontend and Django for the backend.

## Set-up React Frontend
Create the React App:

    npm create vite@latest userinterestfrontend --template react 
    cd userinterestfrontend

Install necessary packages:

    npm install --legacy-peer-deps

Run the frontend:

    npm run dev 

The map functionality is in `src/components/Map.jsx`, the render components are in `src/App.jsx`. Packaged dependancies will be managed by `package.json`, which is created automatically when `npm create vite` is called.

## Set-up Django Backend

Run the backend:

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

Install dependencies:

    bash init_venv.sh
