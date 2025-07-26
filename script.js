  // Load tasks when page loads
        window.onload = function() {
            loadTasks();
        };

        function addTask() {
            var task = document.getElementById("task").value;
            if(task !== ""){
                let li = document.createElement("li");
                
                // Task text
                let taskText = document.createElement("span");
                taskText.className = "task-text";
                taskText.textContent = task;
                li.appendChild(taskText);
                
                // Button container
                let buttonContainer = document.createElement("div");
                buttonContainer.className = "task-buttons";
                
                // Complete button
                let completeBtn = document.createElement("button");
                completeBtn.textContent = "COMPLETE";
                completeBtn.className = "complete-btn";
                completeBtn.onclick = function() { 
                    if(taskText.classList.contains("completed")) {
                        taskText.classList.remove("completed");
                        completeBtn.textContent = "COMPLETE";
                    } else {
                        taskText.classList.add("completed");
                        completeBtn.textContent = "UNDO";
                    }
                    saveTasks();
                };
                buttonContainer.appendChild(completeBtn);
                
                // Edit button
                let editBtn = document.createElement("button");
                editBtn.textContent = "EDIT";
                editBtn.className = "edit-btn";
                editBtn.onclick = function() { 
                    let newText = prompt("Edit task:", taskText.textContent);
                    if(newText !== null && newText.trim() !== "") {
                        taskText.textContent = newText.trim();
                        saveTasks();
                    }
                };
                buttonContainer.appendChild(editBtn);
                
                // Delete button
                let deleteBtn = document.createElement("button");
                deleteBtn.textContent = "DELETE";
                deleteBtn.onclick = function() { 
                    li.remove(); 
                    saveTasks();
                };
                buttonContainer.appendChild(deleteBtn);
                
                li.appendChild(buttonContainer);
                document.getElementById("list").appendChild(li);
                document.getElementById("task").value = "";
                saveTasks();
            } else {
                alert("Field is Empty. Please enter a task.");
            }
        }

        function saveTasks() {
            let tasks = [];
            let taskItems = document.querySelectorAll("#list li");
            taskItems.forEach(function(li) {
                let taskSpan = li.querySelector(".task-text");
                let isCompleted = taskSpan.classList.contains("completed");
                tasks.push({
                    text: taskSpan.textContent,
                    completed: isCompleted
                });
            });
            localStorage.setItem("todoTasks", JSON.stringify(tasks));
        }

        function loadTasks() {
            let savedTasks = localStorage.getItem("todoTasks");
            if(savedTasks) {
                let tasks = JSON.parse(savedTasks);
                tasks.forEach(function(task) {
                    // Simulate adding each saved task
                    document.getElementById("task").value = task.text;
                    addTask();
                    
                    // Mark as completed if it was completed
                    if(task.completed) {
                        let lastTask = document.querySelector("#list li:last-child .task-text");
                        let completeBtn = document.querySelector("#list li:last-child .complete-btn");
                        lastTask.classList.add("completed");
                        completeBtn.textContent = "UNDO";
                    }
                });
                document.getElementById("task").value = "";
            }
        }

        // Allow Enter key to add task
        document.addEventListener("DOMContentLoaded", function() {
            document.getElementById("task").addEventListener("keypress", function(e) {
                if(e.key === "Enter") {
                    addTask();
                }
            });
        });