import React from 'react'

export default function canvas() {
    function handleSubmit(e){
        e.preventDefault()
        var newCommit=document.createElement('div')
        newCommit.id="newCommit";{/**+variable */}
        newCommit.innerHTML="yea"
        var parentDiv=document.getElementById("parentDiv")
        parentDiv.appendChild(newCommit)
    }
    return (
        <>  {/* Note: Use the parent div to make the two elements the same width and have spacing at the same time. 
        As align items center in the parent div doesn't allow it to have spacings*/}
            <form onSubmit={handleSubmit}>
                <div className="d-flex flex-column w-100 justify-content-center align-items-center mb-5" style={{border:"solid yellow"}}>
                    <input type="text" className="m-3"/>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
            <div id="parentDiv" className="d-flex w-100" style={{border:"solid orange"}}>

            </div>
           {/* <canvas id ="canvas" style={{border:"solid black", width:"100%",height:"100%"}}></canvas>*/}
        </>
        
        
    )
    
}
