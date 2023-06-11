build:
	docker build -t givneyt/todo-api-express ./
run:
	docker run -d -p 4001:4001 --rm --name todo-api-express givneyt/todo-api-express
logs: 
	docker logs todo-api-express
stop:
	docker stop todo-api-express
rmi:
	docker rmi givneyt/todo-api-express
push:
	docker push givneyt/todo-api-express
