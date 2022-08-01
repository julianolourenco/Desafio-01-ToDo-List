import { PlusCircle } from 'phosphor-react';
import { FormEvent, useState } from 'react';
import styles from './NewTask.module.css';



export function NewTask() {
  
  const [tasks, setTasks] = useState([
    'Nova tarefa'
  ])

  function handleCreateNewTask(event:FormEvent) {
    event.preventDefault();
  }

  return(
    <form className={styles.taskForm} onSubmit={handleCreateNewTask}>
      <input type="text" placeholder='Adicione uma nova tarefa' required />
      <button type="submit" >
        Criar
        <PlusCircle />
      </button>
    </form>
  )
}