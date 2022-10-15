import React from 'react'
import './CreateModal.css'

const CreateModal = ({active, setActive, children}) => {
  return (
	<div className={active ? "Modal active" : "Modal"} onClick={() => setActive(false)}>
		<div className={active ? "Modal__content active" : "Modal__content"} onClick={e => e.stopPropagation()}>
			{children}
		</div>
	</div>
  )
}

export default CreateModal