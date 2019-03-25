// 1.Add Item to ToDo 從第一格新增清單到第二格
function addFunction() {
    let taskInput = document.querySelector("#new-task");
    let todoUl = document.querySelector("#incomplete-tasks");

    //ToDo checkbox
    let todoIconCircle = document.createElement("i");
    todoIconCircle.classList.add("far","fa-circle");
    let btnConfirm = document.createElement("a");
    btnConfirm.appendChild(todoIconCircle);
    let todoIconDiv1 = document.createElement("div");
    todoIconDiv1.classList.add("check-circle");
    todoIconDiv1.appendChild(btnConfirm);
    let todoLi = document.createElement("li");
    todoLi.appendChild(todoIconDiv1);
    todoUl.appendChild(todoLi);

    //ToDo label
    let todoContent = document.createElement("label");
    todoContent.classList.add("unfinished-task");
    todoContent.textContent = taskInput.value;
    todoLi.appendChild(todoContent);
    
    //ToDo two btn
    let todoIconEdit = document.createElement("i");
    todoIconEdit.classList.add("far","fa-edit");
    let btnEdit = document.createElement("a");
    btnEdit.classList.add("edit","btn");
    btnEdit.appendChild(todoIconEdit);

    let todoIconDelete = document.createElement("i");
    todoIconDelete.classList.add("far", "fa-trash-alt");
    let btnDelete = document.createElement("a");
    btnDelete.classList.add("delete", "btn");
    // Teacher lai why this 立即執行
    // btnDelete.addEventListener("click",deleteFunction);

    // add btn area of two btns
    btnDelete.appendChild(todoIconDelete);
    let todoArea = document.createElement("div");
    todoArea.classList.add("btn-area");
    todoArea.appendChild(btnEdit);
    todoArea.appendChild(btnDelete);
    todoLi.appendChild(todoArea);

    // 按編輯時候出現的確定


    // 監聽刪除
    btnDelete.addEventListener("click", function() {
        deleteFunction(todoLi);
    });
    // 監聽編輯
    btnEdit.addEventListener("click", function() {
        editFunction(todoLi);
    });
    //監聽確定
    btnConfirm.addEventListener("click", function() {
        confirmFunction(todoLi);
    });

}


// 2. ToDo list 


// delete item 新增li的同時也要可以按刪除按鈕，刪除item
function deleteFunction(todoLi){
    let todoUl = document.querySelector("#incomplete-tasks");
    todoUl.removeChild(todoLi);
}

//ToDo edit 新增li的同時也要可以按編輯，編輯li的文字完成後按下面的勾勾icon，編輯完成
function editFunction(todoLi){
    console.log(todoLi.childNodes[1])
    console.log(document.getElementById("unfinished-task"))

    todoLi.childNodes[1].contentEditable = true;
    document.getElementById("unfinished-task").contentEditable = true;
    // document.getElementById("unfinished-task").innerHTML;
    // console.log(document.getElementById("unfinished-task"))
}

//編輯時 刪除另外兩個icon

//按前面的勾勾就跑到完成（第三格）


// 3. ToDo to Completed 按前面的勾勾就跑到完成（第三格）
function confirmFunction(todoLi) {
    let todoUl = document.querySelector("#completed-tasks");
    let todoLi2 = document.createElement("li");
    let todoIconCircle = document.createElement("i");
    todoIconCircle.classList.add("fas","fa-check-circle", "checkbox");
    let todoLabel = document.createElement("label");
    todoLabel.textContent = todoLi.querySelector(".unfinished-task").textContent;
    todoLi2.appendChild(todoIconCircle);
    todoLi2.appendChild(todoLabel);
    todoUl.appendChild(todoLi2);
    let todoUl2 = document.querySelector("#incomplete-tasks");
    todoUl2.removeChild(todoLi);

}




