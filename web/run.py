import project.models as task


if __name__ == "__main__":
    task.create_api()
    task.create_routes()
    task.start_app()
