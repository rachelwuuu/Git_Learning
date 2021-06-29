import React from 'react'

export default function canvas() {
    let divCreationCount=0;
    function handleSubmit(e){
        e.preventDefault()
        var newCommit=document.createElement('div')
        divCreationCount+=1;
        newCommit.style.border= "solid grey";
        newCommit.id="newCommit"+divCreationCount;
        newCommit.innerHTML=document.getElementById("commit_information").value
        var commitInfo=document.getElementById("commit_information").value
        var newCommitInfo=commitInfo.split(/(?=commit)/g);
        console.log(newCommitInfo)
        var parentDiv=document.getElementById("parentDiv")
        parentDiv.appendChild(newCommit)
    }
    return (
        <>  {/* Note: Use the parent div to make the two elements the same width and have spacing at the same time. 
        As align items center in the parent div doesn't allow it to have spacings*/}
            <form onSubmit={handleSubmit}>
                <div className="d-flex flex-column w-100 justify-content-center align-items-center mb-5" style={{border:"solid yellow"}}>
                    <input id="commit_information" type="text" className="m-3"/>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
            <div id="parentDiv" className="d-flex flex-column w-100" style={{border:"solid orange"}}>

            </div>
           {/* <canvas id ="canvas" style={{border:"solid black", width:"100%",height:"100%"}}></canvas>*/}
        </>
        
        
    )
    
}
