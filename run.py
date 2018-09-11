import project.models as task
import webbrowser

task.create_api()
task.create_routes()
task.start_app()

webbrowser.open("http://localhost:5000/tasks")
