# ProyectoDommus
Tener descargado:
- pgadmin
- interprete python
- pip (gestor de paquetes de python)
- un ide o editor de texto para python

Para ejecutar el backend:
- abres el MS-TP-PROJECT
- crear un entorno virtual con el siguiente comando "python -m venv env", si no te funciona busca su equivalente para tu equipo
- lo activas "env\scripts\activate", este comando tmbn puede cambiar según tu OS.
- descargas las dependencias "pip install -r requirements.txt", este comando deberia ser infalible
- crear el .env a nivel del archivo manage.py y agregar los siguiente:
SECRET_KEY=asdfdfghgfhj
DEBUG=True

# llenar este campo con la contraseña de TU gestor de base de datos, que el nombre de la base de datos sea la misma que aquella en setting.py
DB_PASSWORD=
ALLOWED_ORIGINS=http://localhost:3000

# estos son campos que tmbn debes llenar con la información del correo que crees para enviar la confirmación de la creació de cuenta, para conseguirlos te recomiendo ver este video https://www.youtube.com/watch?v=wB1qOExDsYY&t=1088s desde el minuto 4:00.
EMAIL_FROM=
EMAIL_PASSWORD=
EMAIL_HOST_PASSWORD=

Para ejecutar el frontend:
- abres el ms-tp-frontend
- instalas todos los paquetes que requiere "npm install"
- creas el archivo .env.local en el mismo nivel que el readme.md y pones lo siguiente:

# en este campo deberas poner TUS credenciales sobre google cloud con los permisos necesarios, para conseguirlas ve este video https://www.youtube.com/watch?v=2po9_CIRW7I desde el min 2:10
REACT_APP_GOOGLE_MAPS_API_KEY=