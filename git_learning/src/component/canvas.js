import React from 'react'
import {Card} from "react-bootstrap"
export default function canvas() {
    let divCreationCount=0;
    /////(HEAD can only appear once)
    //Explore what is -0400 in the commit message
    function handleSubmit(e){
        e.preventDefault()
        ///////////1.Separate the text from input box and store them in an array
        var commitInfo=document.getElementById("commit_information").value
        //commit d8403b71c9f44d6e619651dbf51e24ec66a487e7
        if (commitInfo.startsWith("commit ")){
            let commitBoxIdArray=[]
            var newCommitArray=commitInfo.split(/(?=commit)/g);
            var validCommitMessage=false;
            let authorArray=[]
            let timeArray=[]
            let commitMessageArray=[]
            //////////////2. Loop through the array and draw the elements dynamically on the website
            for(let p=0;p<newCommitArray.length;p++) {
                let elementCheck=newCommitArray[p];
                //continue spliting the commit message into commit id, author, date
                let commitId=elementCheck.substring(7,47)
                let patternOfGitCommitId=/[\w]{40}/
                if(patternOfGitCommitId.test(commitId) && elementCheck.charAt(47)===" "){
                    validCommitMessage=true;
                    var Author=elementCheck.split(/(?=Author: )/).pop().split(/(?= Date)/)[0].trim()
                    authorArray.push(Author)
                    var commitTime=elementCheck.split(/(?=(Date: ))/).pop().split(/(?= -)/)[0].trim()
                    timeArray.push(commitTime)
                    var commitMessage=elementCheck.split(/-(\d){4} /).pop().trim()
                    commitMessageArray.push(commitMessage)
                }else{
                    console.log("Please enter a commit message with a valid commit id.")
                    validCommitMessage=false;
                    break;
                }
            }
            if(validCommitMessage){
                for(let k=newCommitArray.length-1;k>=0;k--) {
                    var element=newCommitArray[k];
                    var newCommit=document.createElement('div')
                    var parentDiv=document.getElementById("parentDiv")
                    var lastElementId=newCommitArray-1;
                    ////////(1)draw svg of the arrow between the commit boxes within the if statement//////////
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
                    newCommit.addEventListener("click",divChangeWhenClicked(newCommit.id))
                    parentDiv.appendChild(newCommit)
                };   
            }
            function divChangeWhenClicked(id){
                return function(){
                    for(var i=0; i<commitBoxIdArray.length;i++){
                        if(document.getElementById(commitBoxIdArray[i]).style.border==="solid green"){
                            document.getElementById(commitBoxIdArray[i]).style.border="solid grey";
                        }
                    }
                    document.getElementById(id).style.border="solid green"
                }
            }
            
        }else if(commitInfo.startsWith("git ")){

        }else{
            console.log("Please add a commit message or a git command")
        }
        
        
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
            <Card id="parentDiv" className="d-flex flex-column w-100">

            </Card>
           
        </>
        
        
    )
    
}
