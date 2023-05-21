import React from 'react'

const NoteItem = (props) => {

    const {note} = props;

  return (
    <div className='col-md-4 my-3'>    
        <div className="card">
        <div className="card-body">
            <h5 className="card-title">{note.title}</h5>
            <p className="card-text">{note.description} Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ex quod labore voluptatem impedit vel magni dolorem nihil nesciunt dolore, expedita veniam, temporibus maxime inventore! Explicabo eveniet veritatis voluptates id officia alias. Voluptatum, repudiandae amet.</p>           
        </div>
        </div>
    </div>
  )
}

export default NoteItem