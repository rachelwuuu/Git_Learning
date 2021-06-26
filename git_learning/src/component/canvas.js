import React from 'react'

export default function canvas() {
    
    return (
        <>  {/* Use the parent div to make the two elements the same width and have spacing at the same time. 
        As align items center in the parent div doesn't allow it to have spacings*/}
            <div className="d-flex w-100 justify-content-center align-items-center mb-5" style={{border:"solid yellow"}}>
                <form>
                    <input type="text"/>
                </form>
            </div>
            
            
            <canvas id ="canvas" style={{border:"solid black", width:"100%",height:"100%"}}></canvas>
        </>
        
        
    )
    
}
