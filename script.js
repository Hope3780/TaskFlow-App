/* =========================================================
   TASKFLOW + SUPABASE
========================================================= */

/* =========================
   SUPABASE CONFIGURATION
========================= */

const SUPABASE_URL =
    "https://qgvgjlvnmpbszhfzqdwj.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
    "sb_publishable_tYsNAhowyIeI-rve5_Tu3g_Hq6z_gzY";


const supabaseClient =
    window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_PUBLISHABLE_KEY
    );


/* =========================
   LOCAL SETTINGS
========================= */

const THEME_KEY =
    "taskflowTheme";


let tasks = [];

let currentFilter =
    "all";

let editingTaskId =
    null;

let currentUser =
    null;

let activeModal =
    null;

let lastFocusedElement =
    null;

let authMode =
    "login";


/* =========================
   DOM ELEMENTS
========================= */

const authScreen =
    document.getElementById(
        "authScreen"
    );

const appShell =
    document.getElementById(
        "appShell"
    );


const loginForm =
    document.getElementById(
        "loginForm"
    );

const registerForm =
    document.getElementById(
        "registerForm"
    );


const loginEmail =
    document.getElementById(
        "loginEmail"
    );

const loginPassword =
    document.getElementById(
        "loginPassword"
    );


const registerName =
    document.getElementById(
        "registerName"
    );

const registerEmail =
    document.getElementById(
        "registerEmail"
    );

const registerPassword =
    document.getElementById(
        "registerPassword"
    );

const registerConfirmPassword =
    document.getElementById(
        "registerConfirmPassword"
    );


const authSwitchBtn =
    document.getElementById(
        "authSwitchBtn"
    );

const authThemeBtn =
    document.getElementById(
        "authThemeBtn"
    );


const logoutBtn =
    document.getElementById(
        "logoutBtn"
    );

const themeBtn =
    document.getElementById(
        "themeBtn"
    );


const userGreeting =
    document.getElementById(
        "userGreeting"
    );


const searchInput =
    document.getElementById(
        "searchInput"
    );


const taskList =
    document.getElementById(
        "taskList"
    );


const clearCompletedBtn =
    document.getElementById(
        "clearCompletedBtn"
    );

const addTaskBtn =
    document.getElementById(
        "addTaskBtn"
    );


const totalTasks =
    document.getElementById(
        "totalTasks"
    );

const activeTasks =
    document.getElementById(
        "activeTasks"
    );

const completedTasks =
    document.getElementById(
        "completedTasks"
    );

const overdueTasks =
    document.getElementById(
        "overdueTasks"
    );


const productivityPercentage =
    document.getElementById(
        "productivityPercentage"
    );

const progressBar =
    document.getElementById(
        "progressBar"
    );

const productivityText =
    document.getElementById(
        "productivityText"
    );


const toastContainer =
    document.getElementById(
        "toastContainer"
    );


/* =========================
   ADD TASK ELEMENTS
========================= */

const addTaskModal =
    document.getElementById(
        "addTaskModal"
    );

const addTaskForm =
    document.getElementById(
        "addTaskForm"
    );

const taskTitle =
    document.getElementById(
        "taskTitle"
    );

const taskDescription =
    document.getElementById(
        "taskDescription"
    );

const taskCategory =
    document.getElementById(
        "taskCategory"
    );

const taskPriority =
    document.getElementById(
        "taskPriority"
    );

const taskDate =
    document.getElementById(
        "taskDate"
    );


/* =========================
   EDIT TASK ELEMENTS
========================= */

const editTaskModal =
    document.getElementById(
        "editTaskModal"
    );

const editTaskForm =
    document.getElementById(
        "editTaskForm"
    );

const editTaskTitle =
    document.getElementById(
        "editTaskTitle"
    );

const editTaskDescription =
    document.getElementById(
        "editTaskDescription"
    );

const editTaskCategory =
    document.getElementById(
        "editTaskCategory"
    );

const editTaskPriority =
    document.getElementById(
        "editTaskPriority"
    );

const editTaskDate =
    document.getElementById(
        "editTaskDate"
    );


/* =========================================================
   THEME
========================================================= */

function applyTheme(theme) {

    if (theme === "dark") {

        document.body.classList.add(
            "dark-mode"
        );

    } else {

        document.body.classList.remove(
            "dark-mode"
        );
    }


    if (themeBtn) {

        themeBtn.textContent =
            theme === "dark"
                ? "☀️"
                : "🌙";
    }


    if (authThemeBtn) {

        authThemeBtn.textContent =
            theme === "dark"
                ? "☀️"
                : "🌙";
    }


    localStorage.setItem(
        THEME_KEY,
        theme
    );
}


function toggleTheme() {

    const isDark =
        document.body.classList.contains(
            "dark-mode"
        );


    applyTheme(
        isDark
            ? "light"
            : "dark"
    );
}


const savedTheme =
    localStorage.getItem(
        THEME_KEY
    ) || "light";


applyTheme(
    savedTheme
);


themeBtn?.addEventListener(
    "click",
    toggleTheme
);


authThemeBtn?.addEventListener(
    "click",
    toggleTheme
);


/* =========================================================
   AUTH SCREEN
========================================================= */

function showLoginMode() {

    authMode =
        "login";


    loginForm?.classList.remove(
        "hidden"
    );

    registerForm?.classList.add(
        "hidden"
    );


    document.getElementById(
        "authTitle"
    ).textContent =
        "Welcome Back 👋";


    document.getElementById(
        "authSubtitle"
    ).textContent =
        "Sign in to continue managing your tasks.";


    document.getElementById(
        "authSwitchText"
    ).textContent =
        "Don't have an account?";


    authSwitchBtn.textContent =
        "Create an account";
}


function showRegisterMode() {

    authMode =
        "register";


    loginForm?.classList.add(
        "hidden"
    );

    registerForm?.classList.remove(
        "hidden"
    );


    document.getElementById(
        "authTitle"
    ).textContent =
        "Create Your Account 🚀";


    document.getElementById(
        "authSubtitle"
    ).textContent =
        "Create an account to manage your personal tasks.";


    document.getElementById(
        "authSwitchText"
    ).textContent =
        "Already have an account?";


    authSwitchBtn.textContent =
        "Login";
}


function showAuthScreen() {

    authScreen?.classList.remove(
        "hidden"
    );

    appShell?.classList.add(
        "hidden"
    );
}


function showApp() {

    authScreen?.classList.add(
        "hidden"
    );

    appShell?.classList.remove(
        "hidden"
    );
}


authSwitchBtn?.addEventListener(
    "click",
    function () {

        if (
            authMode ===
            "login"
        ) {

            showRegisterMode();

        } else {

            showLoginMode();
        }
    }
);


/* =========================================================
   TOAST
========================================================= */

function showToast(
    message,
    type = "success"
) {

    if (!toastContainer) {
        return;
    }


    const toast =
        document.createElement(
            "div"
        );


    toast.className =
        `toast ${type}`;


    toast.textContent =
        message;


    toastContainer.appendChild(
        toast
    );


    setTimeout(
        () => {

            toast.remove();

        },
        3000
    );
}


/* =========================================================
   GREETING
========================================================= */

function getUserName() {

    if (!currentUser) {
        return "there";
    }


    return (
        currentUser.user_metadata
            ?.name ||
        currentUser.email
            ?.split("@")[0] ||
        "there"
    );
}


function updateGreeting() {

    if (
        !currentUser ||
        !userGreeting
    ) {

        return;
    }


    const hour =
        new Date().getHours();


    let greeting;


    if (hour < 12) {

        greeting =
            "Good morning";

    } else if (hour < 18) {

        greeting =
            "Good afternoon";

    } else {

        greeting =
            "Good evening";
    }


    userGreeting.textContent =
        `${greeting}, ${getUserName()}! 👋`;
}


/* =========================================================
   DATE HELPERS
========================================================= */

function getLocalDateString(
    date = new Date()
) {

    const year =
        date.getFullYear();


    const month =
        String(
            date.getMonth() + 1
        ).padStart(
            2,
            "0"
        );


    const day =
        String(
            date.getDate()
        ).padStart(
            2,
            "0"
        );


    return `${year}-${month}-${day}`;
}


function setMinimumTaskDate() {

    const today =
        getLocalDateString();


    if (taskDate) {

        taskDate.min =
            today;
    }


    if (editTaskDate) {

        editTaskDate.min =
            today;
    }
}


setMinimumTaskDate();


/* =========================================================
   SUPABASE TASK CONVERSION
========================================================= */

function databaseTaskToAppTask(
    task
) {

    return {

        id:
            String(task.id),

        title:
            task.title || "",

        description:
            task.description || "",

        category:
            task.category || "Other",

        priority:
            task.priority || "medium",

        dueDate:
            task.due_date || "",

        completed:
            Boolean(
                task.completed
            ),

        pinned:
            Boolean(
                task.pinned
            ),

        createdAt:
            task.created_at ||
            new Date().toISOString(),

        completedAt:
            task.completed_at ||
            null
    };
}


/* =========================================================
   LOAD TASKS FROM SUPABASE
========================================================= */

async function loadUserTasks() {

    if (!currentUser) {

        tasks = [];

        return;
    }


    const {
        data,
        error
    } =
        await supabaseClient
            .from("tasks")
            .select("*")
            .eq(
                "user_id",
                currentUser.id
            )
            .order(
                "created_at",
                {
                    ascending: false
                }
            );


    if (error) {

        console.error(
            "Load tasks error:",
            error
        );


        showToast(
            "Unable to load your tasks.",
            "error"
        );


        tasks = [];

        return;
    }


    tasks =
        (data || [])
            .map(
                databaseTaskToAppTask
            );
}


/* =========================================================
   REGISTER
========================================================= */

registerForm?.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();


        const name =
            registerName.value.trim();


        const email =
            registerEmail.value
                .trim()
                .toLowerCase();


        const password =
            registerPassword.value;


        const confirmPassword =
            registerConfirmPassword.value;


        if (!name) {

            showToast(
                "Please enter your name.",
                "warning"
            );

            return;
        }


        if (password.length < 6) {

            showToast(
                "Password must be at least 6 characters.",
                "warning"
            );

            return;
        }


        if (
            password !==
            confirmPassword
        ) {

            showToast(
                "Passwords do not match.",
                "error"
            );

            return;
        }


        const {
            data,
            error
        } =
            await supabaseClient
                .auth
                .signUp({

                    email,

                    password,

                    options: {

                        data: {

                            name
                        }
                    }
                });


        if (error) {

            console.error(
                "Registration error:",
                error
            );


            showToast(
                error.message,
                "error"
            );

            return;
        }


        registerForm.reset();


        if (
            data.session &&
            data.user
        ) {

            currentUser =
                data.user;


            showApp();

            updateGreeting();

            await loadUserTasks();

            renderTasks();

            updateStatistics();


            showToast(
                `Welcome to TaskFlow, ${name}! 🎉`,
                "success"
            );

        } else {

            showLoginMode();


            showToast(
                "Account created! Please check your email to confirm your account before logging in. 📧",
                "success"
            );
        }
    }
);


/* =========================================================
   LOGIN
========================================================= */

loginForm?.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();


        const email =
            loginEmail.value
                .trim()
                .toLowerCase();


        const password =
            loginPassword.value;


        const {
            data,
            error
        } =
            await supabaseClient
                .auth
                .signInWithPassword({

                    email,

                    password
                });


        if (error) {

            console.error(
                "Login error:",
                error
            );


            showToast(
                "Incorrect email or password.",
                "error"
            );

            return;
        }


        currentUser =
            data.user;


        loginForm.reset();


        showApp();

        updateGreeting();


        await loadUserTasks();

        renderTasks();

        updateStatistics();


        showToast(
            `Welcome back, ${getUserName()}! 👋`,
            "success"
        );
    }
);


/* =========================================================
   LOGOUT
========================================================= */

logoutBtn?.addEventListener(
    "click",
    async function () {

        const {
            error
        } =
            await supabaseClient
                .auth
                .signOut();


        if (error) {

            console.error(
                "Logout error:",
                error
            );


            showToast(
                "Unable to log out.",
                "error"
            );

            return;
        }


        currentUser =
            null;

        tasks = [];


        showAuthScreen();

        showLoginMode();


        showToast(
            "You have been logged out.",
            "success"
        );
    }
);


/* =========================================================
   AUTH SESSION
========================================================= */

supabaseClient
    .auth
    .onAuthStateChange(
        async function (
            event,
            session
        ) {

            if (
                session &&
                session.user
            ) {

                currentUser =
                    session.user;


                showApp();

                updateGreeting();


                await loadUserTasks();

                renderTasks();

                updateStatistics();

            } else {

                currentUser =
                    null;

                tasks = [];


                showAuthScreen();

                showLoginMode();
            }
        }
    );


/* =========================================================
   INITIALIZE AUTH
========================================================= */

async function initializeApp() {

    showAuthScreen();

    showLoginMode();


    const {
        data,
        error
    } =
        await supabaseClient
            .auth
            .getSession();


    if (error) {

        console.error(
            "Session error:",
            error
        );

        return;
    }


    if (
        data.session &&
        data.session.user
    ) {

        currentUser =
            data.session.user;


        showApp();

        updateGreeting();


        await loadUserTasks();

        renderTasks();

        updateStatistics();
    }
}


/* =========================================================
   MODALS
========================================================= */

function openModal(
    modal
) {

    if (!modal) {
        return;
    }


    lastFocusedElement =
        document.activeElement;


    modal.classList.remove(
        "hidden"
    );


    activeModal =
        modal;


    document.body.classList.add(
        "modal-open"
    );
}


function closeModal(
    modal
) {

    if (!modal) {
        return;
    }


    modal.classList.add(
        "hidden"
    );


    activeModal =
        null;


    document.body.classList.remove(
        "modal-open"
    );


    if (
        lastFocusedElement &&
        typeof lastFocusedElement.focus ===
            "function"
    ) {

        lastFocusedElement.focus();
    }
}


/* =========================================================
   ADD TASK MODAL
========================================================= */

addTaskBtn?.addEventListener(
    "click",
    function () {

        addTaskForm.reset();

        setMinimumTaskDate();


        openModal(
            addTaskModal
        );


        setTimeout(
            () => {

                taskTitle?.focus();

            },
            100
        );
    }
);


/* =========================================================
   CLOSE MODALS
========================================================= */

document.addEventListener(
    "click",
    function (event) {

        const closeButton =
            event.target.closest(
                "[data-close-modal]"
            );


        if (!closeButton) {
            return;
        }


        const modalId =
            closeButton.dataset
                .closeModal;


        const modal =
            document.getElementById(
                modalId
            );


        closeModal(
            modal
        );
    }
);


/* =========================================================
   ESCAPE
========================================================= */

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Escape" &&
            activeModal
        ) {

            closeModal(
                activeModal
            );
        }
    }
);


/* =========================================================
   ADD TASK
========================================================= */

addTaskForm?.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();


        if (!currentUser) {

            showToast(
                "Please log in first.",
                "warning"
            );

            return;
        }


        const title =
            taskTitle.value.trim();


        const description =
            taskDescription.value.trim();


        const category =
            taskCategory.value;


        const priority =
            taskPriority.value;


        const dueDate =
            taskDate.value ||
            null;


        if (!title) {

            showToast(
                "Please enter a task title.",
                "warning"
            );

            return;
        }


        const newTask = {

            id:
                Date.now(),

            user_id:
                currentUser.id,

            title,

            description:
                description || null,

            category,

            priority,

            due_date:
                dueDate,

            completed:
                false,

            pinned:
                false
        };


        const {
            data,
            error
        } =
            await supabaseClient
                .from("tasks")
                .insert(
                    newTask
                )
                .select()
                .single();


        if (error) {

            console.error(
                "Add task error:",
                error
            );


            showToast(
                `Unable to add task: ${error.message}`,
                "error"
            );

            return;
        }


        tasks.unshift(
            databaseTaskToAppTask(
                data
            )
        );


        renderTasks();

        updateStatistics();


        closeModal(
            addTaskModal
        );


        addTaskForm.reset();


        showToast(
            "Task added successfully! ✅",
            "success"
        );
    }
);


/* =========================================================
   EDIT TASK
========================================================= */

function openEditTask(
    taskId
) {

    const task =
        tasks.find(
            item =>
                String(item.id) ===
                String(taskId)
        );


    if (!task) {
        return;
    }


    editingTaskId =
        taskId;


    editTaskTitle.value =
        task.title;


    editTaskDescription.value =
        task.description || "";


    editTaskCategory.value =
        task.category || "Other";


    editTaskPriority.value =
        task.priority || "medium";


    editTaskDate.value =
        task.dueDate || "";


    setMinimumTaskDate();


    openModal(
        editTaskModal
    );


    setTimeout(
        () => {

            editTaskTitle.focus();

        },
        100
    );
}


editTaskForm?.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();


        if (!currentUser) {
            return;
        }


        const title =
            editTaskTitle.value.trim();


        if (!title) {

            showToast(
                "Please enter a task title.",
                "warning"
            );

            return;
        }


        const updatedValues = {

            title,

            description:
                editTaskDescription
                    .value
                    .trim() ||
                null,

            category:
                editTaskCategory.value,

            priority:
                editTaskPriority.value,

            due_date:
                editTaskDate.value ||
                null
        };


        const {
            data,
            error
        } =
            await supabaseClient
                .from("tasks")
                .update(
                    updatedValues
                )
                .eq(
                    "id",
                    Number(
                        editingTaskId
                    )
                )
                .eq(
                    "user_id",
                    currentUser.id
                )
                .select()
                .single();


        if (error) {

            console.error(
                "Update task error:",
                error
            );


            showToast(
                "Unable to update task.",
                "error"
            );

            return;
        }


        const index =
            tasks.findIndex(
                item =>
                    String(item.id) ===
                    String(editingTaskId)
            );


        if (index !== -1) {

            tasks[index] =
                databaseTaskToAppTask(
                    data
                );
        }


        renderTasks();

        updateStatistics();


        closeModal(
            editTaskModal
        );


        editingTaskId =
            null;


        showToast(
            "Task updated successfully! ✏️",
            "success"
        );
    }
);


/* =========================================================
   COMPLETE TASK
========================================================= */

async function toggleTaskCompletion(
    taskId
) {

    const task =
        tasks.find(
            item =>
                String(item.id) ===
                String(taskId)
        );


    if (!task || !currentUser) {
        return;
    }


    const newCompleted =
        !task.completed;


    const completedAt =
        newCompleted
            ? new Date().toISOString()
            : null;


    const {
        data,
        error
    } =
        await supabaseClient
            .from("tasks")
            .update({

                completed:
                    newCompleted,

                completed_at:
                    completedAt
            })
            .eq(
                "id",
                Number(taskId)
            )
            .eq(
                "user_id",
                currentUser.id
            )
            .select()
            .single();


    if (error) {

        console.error(
            "Completion error:",
            error
        );


        showToast(
            "Unable to update task.",
            "error"
        );


        renderTasks();

        return;
    }


    const index =
        tasks.findIndex(
            item =>
                String(item.id) ===
                String(taskId)
        );


    if (index !== -1) {

        tasks[index] =
            databaseTaskToAppTask(
                data
            );
    }


    renderTasks();

    updateStatistics();


    if (newCompleted) {

        showToast(
            `"${task.title}" completed! 🎉`,
            "success"
        );

    } else {

        showToast(
            `"${task.title}" marked as active.`,
            "warning"
        );
    }
}


/* =========================================================
   PIN TASK
========================================================= */

async function toggleTaskPin(
    taskId
) {

    const task =
        tasks.find(
            item =>
                String(item.id) ===
                String(taskId)
        );


    if (!task || !currentUser) {
        return;
    }


    const {
        data,
        error
    } =
        await supabaseClient
            .from("tasks")
            .update({

                pinned:
                    !task.pinned
            })
            .eq(
                "id",
                Number(taskId)
            )
            .eq(
                "user_id",
                currentUser.id
            )
            .select()
            .single();


    if (error) {

        console.error(
            "Pin error:",
            error
        );


        showToast(
            "Unable to update task.",
            "error"
        );

        return;
    }


    const index =
        tasks.findIndex(
            item =>
                String(item.id) ===
                String(taskId)
        );


    if (index !== -1) {

        tasks[index] =
            databaseTaskToAppTask(
                data
            );
    }


    renderTasks();


    showToast(
        data.pinned
            ? "Task pinned 📌"
            : "Task unpinned.",
        "success"
    );
}


/* =========================================================
   DELETE TASK
========================================================= */

async function deleteTask(
    taskId
) {

    const task =
        tasks.find(
            item =>
                String(item.id) ===
                String(taskId)
        );


    if (!task || !currentUser) {
        return;
    }


    const confirmed =
        confirm(
            `Are you sure you want to delete "${task.title}"?`
        );


    if (!confirmed) {
        return;
    }


    const {
        error
    } =
        await supabaseClient
            .from("tasks")
            .delete()
            .eq(
                "id",
                Number(taskId)
            )
            .eq(
                "user_id",
                currentUser.id
            );


    if (error) {

        console.error(
            "Delete error:",
            error
        );


        showToast(
            "Unable to delete task.",
            "error"
        );

        return;
    }


    tasks =
        tasks.filter(
            item =>
                String(item.id) !==
                String(taskId)
        );


    renderTasks();

    updateStatistics();


    showToast(
        "Task deleted.",
        "error"
    );
}


/* =========================================================
   CLEAR COMPLETED
========================================================= */

clearCompletedBtn?.addEventListener(
    "click",
    async function () {

        if (!currentUser) {
            return;
        }


        const completedCount =
            tasks.filter(
                task =>
                    task.completed
            ).length;


        if (
            completedCount === 0
        ) {

            showToast(
                "There are no completed tasks to clear.",
                "warning"
            );

            return;
        }


        const confirmed =
            confirm(
                `Delete ${completedCount} completed task(s)?`
            );


        if (!confirmed) {
            return;
        }


        const {
            error
        } =
            await supabaseClient
                .from("tasks")
                .delete()
                .eq(
                    "user_id",
                    currentUser.id
                )
                .eq(
                    "completed",
                    true
                );


        if (error) {

            console.error(
                "Clear completed error:",
                error
            );


            showToast(
                "Unable to clear completed tasks.",
                "error"
            );

            return;
        }


        tasks =
            tasks.filter(
                task =>
                    !task.completed
            );


        renderTasks();

        updateStatistics();


        showToast(
            "Completed tasks cleared.",
            "success"
        );
    }
);


/* =========================================================
   DATE FILTERS
========================================================= */

function isToday(
    dateString
) {

    return (
        dateString &&
        dateString ===
            getLocalDateString()
    );
}


function isTomorrow(
    dateString
) {

    if (!dateString) {
        return false;
    }


    const tomorrow =
        new Date();


    tomorrow.setDate(
        tomorrow.getDate() + 1
    );


    return (
        dateString ===
        getLocalDateString(
            tomorrow
        )
    );
}


function isThisWeek(
    dateString
) {

    if (!dateString) {
        return false;
    }


    const date =
        new Date(
            `${dateString}T00:00:00`
        );


    const today =
        new Date();


    const day =
        today.getDay();


    const mondayOffset =
        day === 0
            ? -6
            : 1 - day;


    const startOfWeek =
        new Date(today);


    startOfWeek.setDate(
        today.getDate() +
            mondayOffset
    );


    startOfWeek.setHours(
        0,
        0,
        0,
        0
    );


    const endOfWeek =
        new Date(
            startOfWeek
        );


    endOfWeek.setDate(
        startOfWeek.getDate() +
            6
    );


    endOfWeek.setHours(
        23,
        59,
        59,
        999
    );


    return (
        date >= startOfWeek &&
        date <= endOfWeek
    );
}


/* =========================================================
   OVERDUE
========================================================= */

function isOverdue(
    task
) {

    if (
        !task.dueDate ||
        task.completed
    ) {

        return false;
    }


    return (
        task.dueDate <
        getLocalDateString()
    );
}


/* =========================================================
   FILTER MATCH
========================================================= */

function matchesFilter(
    task
) {

    switch (
        currentFilter
    ) {

        case "active":

            return !task.completed;


        case "completed":

            return task.completed;


        case "today":

            return isToday(
                task.dueDate
            );


        case "tomorrow":

            return isTomorrow(
                task.dueDate
            );


        case "week":

            return isThisWeek(
                task.dueDate
            );


        default:

            return true;
    }
}


/* =========================================================
   SEARCH
========================================================= */

searchInput?.addEventListener(
    "input",
    function () {

        renderTasks();
    }
);


/* =========================================================
   FILTER BUTTONS
========================================================= */

document.addEventListener(
    "click",
    function (event) {

        const filterButton =
            event.target.closest(
                "[data-filter]"
            );


        if (!filterButton) {
            return;
        }


        currentFilter =
            filterButton.dataset.filter;


        document
            .querySelectorAll(
                "[data-filter]"
            )
            .forEach(
                button => {

                    button.classList.remove(
                        "active"
                    );
                }
            );


        filterButton.classList.add(
            "active"
        );


        renderTasks();
    }
);


/* =========================================================
   ESCAPE HTML
========================================================= */

function escapeHTML(
    value
) {

    const div =
        document.createElement(
            "div"
        );


    div.textContent =
        value || "";


    return div.innerHTML;
}


/* =========================================================
   FORMAT DATE
========================================================= */

function formatDate(
    dateString
) {

    if (!dateString) {
        return "No due date";
    }


    const date =
        new Date(
            `${dateString}T00:00:00`
        );


    return date.toLocaleDateString(
        "en-ZA",
        {
            day: "numeric",
            month: "short",
            year: "numeric"
        }
    );
}


/* =========================================================
   COMPLETION TIME
========================================================= */

function formatCompletedTime(
    dateString
) {

    const date =
        new Date(
            dateString
        );


    return date.toLocaleString(
        "en-ZA",
        {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        }
    );
}


/* =========================================================
   RENDER TASKS
========================================================= */

function renderTasks() {

    if (!taskList) {
        return;
    }


    const searchTerm =
        searchInput
            ? searchInput.value
                .trim()
                .toLowerCase()
            : "";


    let filteredTasks =
        tasks.filter(
            task => {

                const title =
                    (
                        task.title ||
                        ""
                    )
                        .toLowerCase();


                const description =
                    (
                        task.description ||
                        ""
                    )
                        .toLowerCase();


                const category =
                    (
                        task.category ||
                        ""
                    )
                        .toLowerCase();


                const matchesSearch =
                    title.includes(
                        searchTerm
                    ) ||
                    description.includes(
                        searchTerm
                    ) ||
                    category.includes(
                        searchTerm
                    );


                return (
                    matchesSearch &&
                    matchesFilter(
                        task
                    )
                );
            }
        );


    filteredTasks.sort(
        (a, b) => {

            if (
                a.pinned &&
                !b.pinned
            ) {

                return -1;
            }


            if (
                !a.pinned &&
                b.pinned
            ) {

                return 1;
            }


            return 0;
        }
    );


    if (
        filteredTasks.length === 0
    ) {

        taskList.innerHTML = `

            <div class="empty-state">

                <div class="empty-icon">
                    📋
                </div>

                <h3>
                    No tasks found
                </h3>

                <p>
                    ${
                        searchTerm
                            ? "Try searching for something else."
                            : "You don't have any tasks here yet."
                    }
                </p>

            </div>

        `;

        return;
    }


    taskList.innerHTML =
        filteredTasks
            .map(
                task => {

                    const completedClass =
                        task.completed
                            ? "completed"
                            : "";


                    const overdueClass =
                        isOverdue(task)
                            ? "overdue"
                            : "";


                    const priorityClass =
                        `priority-${(
                            task.priority ||
                            "medium"
                        ).toLowerCase()}`;


                    return `

                        <article
                            class="task-card ${completedClass} ${overdueClass}"
                        >

                            <div class="task-check">

                                <input
                                    type="checkbox"
                                    class="task-checkbox"
                                    data-task-id="${task.id}"
                                    ${
                                        task.completed
                                            ? "checked"
                                            : ""
                                    }
                                    aria-label="Complete task"
                                >

                            </div>


                            <div class="task-content">

                                <div class="task-title-row">

                                    <h3 class="task-title">

                                        ${escapeHTML(
                                            task.title
                                        )}

                                    </h3>

                                    ${
                                        task.pinned
                                            ? `
                                                <span
                                                    class="pin-indicator"
                                                    title="Pinned"
                                                >
                                                    📌
                                                </span>
                                            `
                                            : ""
                                    }

                                </div>


                                ${
                                    task.description
                                        ? `
                                            <p class="task-description">

                                                ${escapeHTML(
                                                    task.description
                                                )}

                                            </p>
                                          `
                                        : ""
                                }


                                <div class="task-meta">

                                    <span class="task-category">

                                        ${escapeHTML(
                                            task.category ||
                                            "Other"
                                        )}

                                    </span>


                                    <span
                                        class="priority ${priorityClass}"
                                    >

                                        ${
                                            task.priority ||
                                            "Medium"
                                        }

                                    </span>


                                    ${
                                        task.dueDate
                                            ? `
                                                <span
                                                    class="task-date ${
                                                        isOverdue(
                                                            task
                                                        )
                                                            ? "date-overdue"
                                                            : ""
                                                    }"
                                                >

                                                    📅
                                                    ${formatDate(
                                                        task.dueDate
                                                    )}

                                                    ${
                                                        isOverdue(
                                                            task
                                                        )
                                                            ? " • Overdue"
                                                            : ""
                                                    }

                                                </span>
                                            `
                                            : ""
                                    }

                                </div>


                                ${
                                    task.completedAt
                                        ? `
                                            <div class="completed-time">

                                                ✓ Completed
                                                ${formatCompletedTime(
                                                    task.completedAt
                                                )}

                                            </div>
                                          `
                                        : ""
                                }

                            </div>


                            <div class="task-actions">

                                <button
                                    type="button"
                                    class="icon-btn"
                                    data-action="pin"
                                    data-id="${task.id}"
                                    title="${
                                        task.pinned
                                            ? "Unpin task"
                                            : "Pin task"
                                    }"
                                >

                                    ${
                                        task.pinned
                                            ? "📌"
                                            : "📍"
                                    }

                                </button>


                                <button
                                    type="button"
                                    class="icon-btn"
                                    data-action="edit"
                                    data-id="${task.id}"
                                    title="Edit task"
                                >
                                    ✏️
                                </button>


                                <button
                                    type="button"
                                    class="icon-btn delete-btn"
                                    data-action="delete"
                                    data-id="${task.id}"
                                    title="Delete task"
                                >
                                    🗑️
                                </button>

                            </div>

                        </article>

                    `;
                }
            )
            .join("");
}


/* =========================================================
   TASK ACTIONS
========================================================= */

taskList?.addEventListener(
    "click",
    function (event) {

        const button =
            event.target.closest(
                "[data-action]"
            );


        if (!button) {
            return;
        }


        const action =
            button.dataset.action;


        const taskId =
            button.dataset.id;


        if (
            action === "pin"
        ) {

            toggleTaskPin(
                taskId
            );
        }


        if (
            action === "edit"
        ) {

            openEditTask(
                taskId
            );
        }


        if (
            action === "delete"
        ) {

            deleteTask(
                taskId
            );
        }
    }
);


/* =========================================================
   CHECKBOX
========================================================= */

taskList?.addEventListener(
    "change",
    function (event) {

        if (
            !event.target.matches(
                ".task-checkbox"
            )
        ) {

            return;
        }


        const taskId =
            event.target.dataset
                .taskId;


        toggleTaskCompletion(
            taskId
        );
    }
);


/* =========================================================
   STATISTICS
========================================================= */

function updateStatistics() {

    const total =
        tasks.length;


    const completed =
        tasks.filter(
            task =>
                task.completed === true
        ).length;


    const active =
        total - completed;


    const overdue =
        tasks.filter(
            task =>
                isOverdue(task)
        ).length;


    let productivity =
        0;


    if (total > 0) {

        productivity =
            Math.round(
                (
                    completed /
                    total
                ) * 100
            );
    }


    if (totalTasks) {

        totalTasks.textContent =
            total;
    }


    if (activeTasks) {

        activeTasks.textContent =
            active;
    }


    if (completedTasks) {

        completedTasks.textContent =
            completed;
    }


    if (overdueTasks) {

        overdueTasks.textContent =
            overdue;
    }


    if (productivityPercentage) {

        productivityPercentage.textContent =
            `${productivity}%`;
    }


    if (progressBar) {

        progressBar.style.width =
            `${productivity}%`;
    }


    if (productivityText) {

        if (total === 0) {

            productivityText.textContent =
                "Start completing tasks to track your productivity.";

        } else if (
            productivity === 100
        ) {

            productivityText.textContent =
                "Amazing! All your tasks are completed! 🎉";

        } else if (
            productivity >= 75
        ) {

            productivityText.textContent =
                "Great progress! Keep going! 💪";

        } else if (
            productivity >= 50
        ) {

            productivityText.textContent =
                "You're halfway there. Keep pushing! 🚀";

        } else if (
            productivity > 0
        ) {

            productivityText.textContent =
                "Good start! Keep completing your tasks.";

        } else {

            productivityText.textContent =
                "Start completing tasks to track your productivity.";
        }
    }
}


/* =========================================================
   START TASKFLOW
========================================================= */

initializeApp();
