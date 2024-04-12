import React, { KeyboardEvent, useState } from 'react'

interface Todo {
  id: string,
  todo: string,
  dateCreated: Date,
  isCompleted: boolean,
}

export default function App() {
  const [checked, setChecked] = useState(false)
  const [todos, setTodos] = useState<Todo[]>([])

  function generateUniqueId() {
    return Math.random().toString(36).substr(2, 9);
  }

  function addTodo(todo: string) {
    const newTodo = {
      todo,
      id: generateUniqueId(),
      dateCreated: new Date(),
      isCompleted: false,
    }
    setTodos([{...newTodo}, ...todos])
  }

  function toggleTodo(todo: Todo) {
    const tempTodos = [...todos]
    const selectedTodoIdx = tempTodos.findIndex(tempTodo => tempTodo.id === todo.id)
    if(selectedTodoIdx !== -1) {
      tempTodos[selectedTodoIdx] = { ...tempTodos[selectedTodoIdx], isCompleted: !todo.isCompleted }
      const completedTodos = tempTodos.filter(todo => todo.isCompleted)
      const notCompletedTodos = tempTodos.filter(todo => !todo.isCompleted)
      setTodos([...notCompletedTodos, ...completedTodos])
    }
  }

  return (
    <div id='root'>
      <div className='h-screen relative'>
        <div className='p-24 bg-sky-800'>
          {/* <h1 className='text-white text-center text-xl'>New typescript tailwind project</h1> */}
        </div>

        <div className='absolute top-0 w-full h-screen p-12'>
          <div className="flex justify-center items-center">
            <div className="w-4/5 md:w-2/4 xl:w-1/4">
              <div>
                <div className="py-5">
                  <h3 className='text-white text-xl'>Todo</h3>
                </div>

                <div className="text-slate-50">
                  <div className="py-4">
                    <TodoInput addTodo={addTodo} />
                  </div>

                  <div className='shadow-lg rounded-sm'>
                    {todos.map(todo => (
                      <TodoItem 
                        key={todo.id}
                        todo={todo}
                        toggleTodo={toggleTodo}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

interface TodoInputProps {
  addTodo: (todo: string) => void
}

function TodoInput({ addTodo }: TodoInputProps) {
  const [value, setValue] = useState('')

  function onChange(e: React.FormEvent<HTMLInputElement>): void {
    const { value } = e.target as HTMLInputElement
    setValue(value)
  } 

  function onAddTodo(e: KeyboardEvent) {
    const { key } = e
    if(key === 'Enter') {
      addTodo(value)
      setValue('')
    }
  }

  return (
    <div className="bg-slate-800">
      <div className={`flex items-center p-4`}>
        <input id="checkbox" type="checkbox" className="hidden" />
        <label htmlFor="checkbox" className="flex items-center cursor-pointer w-full">
          <div className="relative w-7 h-6 border rounded-full bg-slate-800 mr-3">
            <div className="absolute inset-0 w-full h-full rounded-full bg-slate-800 border border-slate-500"></div>
            <input type="checkbox" className="hidden" />
            <svg className="hidden absolute w-8 h-7 text-white inset-center" viewBox="0 0 24 24">
              <path fill="currentColor" d="M5.75 13.354l-2.35-2.353a1.25 1.25 0 0 1 1.768-1.768l1.234 1.233 4.857-4.855a1.25 1.25 0 1 1 1.768 1.768l-5.625 5.624a1.25 1.25 0 0 1-1.768 0z"/>
            </svg>
          </div>
          <input type="text" value={value} onChange={onChange} onKeyUp={onAddTodo} className='text-base py-1 w-full bg-slate-800 text-white' placeholder='Create a new todo...' />
        </label>
      </div>
    </div>
  )
}

interface TodoItemProps {
  todo: Todo,
  toggleTodo: (todo: Todo) => void
}

function TodoItem({ todo, toggleTodo }: TodoItemProps) {
  return (
    <div className="bg-slate-800" onClick={() => toggleTodo(todo)}>
      <div className={`group ${todo.isCompleted ? 'checked' : ''} flex items-center p-4`}>
        <input id="checkbox" type="checkbox" className="hidden" />
        <label htmlFor="checkbox" className="flex items-center cursor-pointer w-full">
          <div className="relative w-7 h-6 border rounded-full bg-slate-800 mr-3">
            <div className="absolute inset-0 w-full h-full rounded-full bg-slate-800 border border-slate-500"></div>
            <input type="checkbox" className="hidden" />
            <svg className="hidden group-[.checked]:block absolute w-8 h-7 text-white inset-center" viewBox="0 0 24 24">
              <path fill="currentColor" d="M5.75 13.354l-2.35-2.353a1.25 1.25 0 0 1 1.768-1.768l1.234 1.233 4.857-4.855a1.25 1.25 0 1 1 1.768 1.768l-5.625 5.624a1.25 1.25 0 0 1-1.768 0z"/>
            </svg>
          </div>
          <span className="group-[.checked]:line-through group-[.checked]:text-slate-500 select-none ms-1 text-base inline-block w-full">{todo.todo}</span>
        </label>
      </div>
    </div>
  )
}