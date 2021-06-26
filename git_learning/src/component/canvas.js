import React from 'react'

export default function canvas() {
    
    return (
        <>  
            <div className="d-flex w-75 justify-content-center align-items-center" style={{maxWidth:"600px"}}>
                <form>
                    <input type="text"/>
                </form>
            </div>
            
                
            <canvas id ="canvas" style={{border:"solid black", width:"100%",height:"100%"}}></canvas>
        </>
        
        
    )
    
}
