import React from 'react'

export default function canvas() {
    let divCreationCount=0;
    let commitBoxIdArray=[]
    function handleSubmit(e){
        e.preventDefault()
        var commitInfo=document.getElementById("commit_information").value
        var newCommitArray=commitInfo.split(/(?=commit)/g);
        newCommitArray.reverse().forEach(element => {
            var newCommit=document.createElement('div')
            var parentDiv=document.getElementById("parentDiv")
            var lastElementId=newCommitArray-1;
            if(divCreationCount>0||divCreationCount<(lastElementId)){
                var path=document.createElementNS('http://www.w3.org/2000/svg',"path")
                path.setAttributeNS(null,"d", "M 0 0 L 10 5 L 0 10 z")
                var marker=document.createElementNS('http://www.w3.org/2000/svg',"marker")
                marker.setAttribute("id","arrowHead")
                marker.setAttribute("viewBox", "0 0 10 10")
                marker.setAttribute("markerWidth", "3")
                marker.setAttribute("markerHeight", "3")
                marker.setAttribute("refX", "5")
                marker.setAttribute("refY", "5")
                marker.setAttribute("orient", "auto-start-reverse")
                var polyline=document.createElementNS('http://www.w3.org/2000/svg',"polyline")
                polyline.setAttribute("points","50, 0 50, 20")
                polyline.setAttribute("fill","none")
                polyline.setAttribute("stroke","black")
                polyline.setAttribute("marker-end","url(#arrowHead)")
                var defs=document.createElementNS('http://www.w3.org/2000/svg','defs')
                var arrow=document.createElementNS('http://www.w3.org/2000/svg',"svg")
                arrow.setAttribute("viewBox","0 0 100 22")
                arrow.setAttributeNS('http://www.w3.org/2000/xmlns/',"xmlns:xlink",'http://www.w3.org/2000/xmlns/')
                var connectingDiv=document.createElement('div')
                connectingDiv.style.background= "solid red";
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
            commitBoxIdArray.push(newCommit.id)
            newCommit.innerHTML=element
            newCommit.addEventListener("click",function(e)
            {
                for(var i=0; i<commitBoxIdArray.length;i++){
                    if(document.getElementById(commitBoxIdArray[i]).style.border==="solid green"){
                        document.getElementById(commitBoxIdArray[i]).style.border="solid grey";
                    }
                }
                document.getElementById(newCommit.id).style.border="solid green"
            })
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
           
        </>
        
        
    )
    
}
