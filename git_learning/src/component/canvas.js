import React from 'react'

export default function canvas() {
    let divCreationCount=0;
    function handleSubmit(e){
        e.preventDefault()
        
        
        
        var commitInfo=document.getElementById("commit_information").value
        var newCommitArray=commitInfo.split(/(?=commit)/g);
        newCommitArray.reverse().forEach(element => {
            var newCommit=document.createElement('div')
            var parentDiv=document.getElementById("parentDiv")
            console.log("div"+newCommitArray.length)
            var lastElementId=newCommitArray-1;
            if(divCreationCount>0||divCreationCount<(lastElementId)){
                console.log("...")
                var path=document.createElementNS('http://www.w3.org/2000/svg',"path")
                path.setAttributeNS(null,"d", "M 0 0 L 10 5 L 0 10 z")
                var marker=document.createElementNS('http://www.w3.org/2000/svg',"marker")
                marker.setAttribute("id","arrowHead")
                marker.setAttribute("viewBox", "0 0 10 10")
                marker.setAttribute("markerWidth", "6")
                marker.setAttribute("markerHeight", "6")
                marker.setAttribute("refX", "5")
                marker.setAttribute("refY", "5")
                marker.setAttribute("orient", "auto-start-reverse")
                var polyline=document.createElementNS('http://www.w3.org/2000/svg',"polyline")
                polyline.setAttribute("points","10, 10 10, 90")
                polyline.setAttribute("fill","none")
                polyline.setAttribute("stroke","black")
                polyline.setAttribute("markerEnd","url(#arrowHead)")
                var defs=document.createElementNS('http://www.w3.org/2000/svg','defs')
                var arrow=document.createElementNS('http://www.w3.org/2000/svg',"svg")
                arrow.setAttribute("viewBox","0 0 100 100")
                arrow.setAttributeNS('http://www.w3.org/2000/xmlns/',"xmlns:xlink",'http://www.w3.org/2000/xmlns/')
                var connectingDiv=document.createElement('div')
                connectingDiv.style.border= "solid red";
                connectingDiv.id="connectingDiv"+(divCreationCount);
                
                parentDiv.appendChild(connectingDiv)
                connectingDiv.appendChild(arrow)
                arrow.appendChild(defs)
                defs.appendChild(marker)
                marker.appendChild(path)
                arrow.appendChild(polyline)
               
            }
            
            divCreationCount+=1;
            newCommit.style.border= "solid grey";
            newCommit.id="newCommit"+divCreationCount;
            newCommit.innerHTML=element
            
            parentDiv.appendChild(newCommit)
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
                <polyline points="10, 10 10, 90" fill="none" stroke="black" markerEnd="url(#arrowHead)"></polyline>
            </svg>
           {/* <canvas id ="canvas" style={{border:"solid black", width:"100%",height:"100%"}}></canvas>*/}
        </>
        
        
    )
    
}
