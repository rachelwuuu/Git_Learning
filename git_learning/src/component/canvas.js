import React from 'react'

export default function canvas() {
    let divCreationCount=0;
    function handleSubmit(e){
        e.preventDefault()
        
        
        
        var commitInfo=document.getElementById("commit_information").value
        var newCommitArray=commitInfo.split(/(?=commit)/g);
        newCommitArray.forEach(element => {
            var newCommit=document.createElement('div')
            var arrow=document.createElementNS('http://www.w3.org/2000/svg',"svg")
            divCreationCount+=1;
            newCommit.style.border= "solid grey";
            newCommit.id="newCommit"+divCreationCount;
            newCommit.innerHTML=element
            var parentDiv=document.getElementById("parentDiv")
            parentDiv.appendChild(newCommit)
            var newCommitOffset=newCommit.offsetHeight
            console.log(newCommitOffset+";")
        });
        
        
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
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <marker id="arrowHead" viewBox="0 0 10 10" markerWidth="6" markerHeight="6" refX="5" refY="5" orient="auto-start-reverse">
                        <path d="M 0 0 L 10 5 L 0 10 z"></path>
                    </marker>
                </defs>
                <polyline points="60, 10 10, 90" fill="none" stroke="black" markerEnd="url(#arrowHead)"></polyline>
            </svg>
           {/* <canvas id ="canvas" style={{border:"solid black", width:"100%",height:"100%"}}></canvas>*/}
        </>
        
        
    )
    
}
