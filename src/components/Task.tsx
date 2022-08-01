import { Trash } from 'phosphor-react';
import styles from './Task.module.css';
import { v4 as uuidv4 } from 'uuid';

interface TaskProps {
  id: uuidv4;
  title: string;
  isComplete?: boolean;
  onToggleStatusTask: (id: uuidv4) => void;
  onDeleteTask: (id: uuidv4) => void;
}

export function Task({id, title, isComplete = false, onToggleStatusTask, onDeleteTask}: TaskProps) {

  function handleDeleteTask(){     
    onDeleteTask(id);
  }

  function handleToggleStatusTask() {
    onToggleStatusTask(id);
  }

  return (
    <div className={`${styles.task} ${isComplete ? styles.isComplete : ''}`}>
      <div className={styles.wrap}>
        <button 
          onClick={handleToggleStatusTask}
          type='button' 
          className={styles.check}
        >
          <span></span>
        </button>
      </div>
      <div className={styles.body}>
        <p>{title}</p>
      </div>
      <div className={styles.wrap}>
        <button 
          onClick={handleDeleteTask}
          type='button'
          className={styles.delete}
          title='Deletar tarefa'
        >
          <Trash size={24} />
        </button>
      </div>
    </div>
  );
}