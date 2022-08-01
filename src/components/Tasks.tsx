import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react';
import { PlusCircle } from 'phosphor-react';
import {v4 as uuidv4} from 'uuid';

import clipboad from '../assets/clipboard.png';

import styles from './Tasks.module.css';
import stylesNewTask from './NewTask.module.css';

import { Task } from './Task';

interface TaskProps {
  id: uuidv4;
  title: string;
  isComplete?: boolean;
}

export function Tasks() {

  const [tasks, setTasks] = useState<TaskProps[]>([]);

  const [newTaskText, setNewTaskText] = useState('');

  const isNewTaskEmpty = newTaskText.length === 0;

  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault();
    let newId:uuidv4 = uuidv4();
    let newTask = {
      id: newId,
      title: newTaskText,
      isComplete: false
    }
    
    setTasks([...tasks, newTask]);
    setNewTaskText('');
  }

  function handleNewTaskChange(event:ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity('');
    setNewTaskText(event.target.value);
  }

  function handleNewTaskInvalid(event: InvalidEvent<HTMLInputElement>) {
    event.target.setCustomValidity('Este campo é obrigatório');
  }

  function toggleStatusTask(taskToToggleStatus: uuidv4) {
    const newTaskList = tasks.map(task => {
      if(task.id === taskToToggleStatus) {
        task.isComplete = !task.isComplete;
      }
      return task;
    });
    
    setTasks(newTaskList);
  }

  function deleteTask(taskToDelete: uuidv4) {
    const tasksWithoutDeleteOne = tasks.filter(task => {
      return task.id !== taskToDelete;
    });

    setTasks(tasksWithoutDeleteOne);
  }

  return (
    <>
      <form className={stylesNewTask.taskForm} onSubmit={handleCreateNewTask}>
        <input 
          type="text"
          name="task"
          autoComplete='off'
          placeholder='Adicione uma nova tarefa' 
          value={newTaskText}
          onChange={handleNewTaskChange}
          onInvalid={handleNewTaskInvalid}
          required 
        />
        <button type="submit" disabled={isNewTaskEmpty}>
          Criar
          <PlusCircle />
        </button>
      </form>
      <div className={styles.tasks}>
        <div className={styles.info}>
          <div className={styles.created}>
            Tarefas criadas
            <span className={styles.counter}>{tasks.length}</span>
          </div>
          <div className={styles.done}>
            Concluídas
            <span className={styles.counter}>
              {/* {
                tasks.reduce((acc, task) => {
                  if (task.isComplete) {
                    acc++;
                  }
                  return acc;
                },0)
              } */}
              {tasks.length > 0 && `${tasks.filter(task => task.isComplete).length}`}
              {tasks.length > 0 && ` de `}
              {tasks.length}
            </span>
          </div>
        </div>
        {tasks.length === 0 &&
          <div className={styles.empty}>
            <img src={clipboad}  />
            <p><strong>Você ainda não tem tarefas cadastradas</strong> Crie tarefas e organize seus itens a fazer</p>
          </div>
        }
        <div className={styles.list}>
          {tasks.map(task => {
            return (
              <Task
                key={task.id}
                id={task.id}
                title={task.title}
                isComplete={task.isComplete}
                onToggleStatusTask={toggleStatusTask}
                onDeleteTask={deleteTask}
              />
            )
          })}
        </div>
      </div>
    </>
  )
}