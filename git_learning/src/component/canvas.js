import React from 'react'
import {Card} from "react-bootstrap"
import {Container} from "react-bootstrap"
export default function canvas() {
    let divCreationCount=0;
    /////(HEAD can only appear once)
    //Explore what is -0400 in the commit message
    var commitBoxIdArray=[]
    var plusBoxMap={}
    var headId
    var headTime
    function handleSubmit(){
        ///////////1.Separate the text from input box and store them in an array
        var commitInfo=document.getElementById("commit_information").value
        if (commitInfo.startsWith("commit ")){
            if(commitInfo.includes("HEAD")){
                
                var newCommitArray=commitInfo.split(/(?=commit)/g);
                var validCommitMessage=false;
                var authorArray=[]
                var timeArray=[]
                var commitMessageArray=[]
                var commitIdArray=[]
                //////////////2. Loop through the array and draw the elements dynamically on the website
                for(let p=0;p<newCommitArray.length;p++) {
                    let elementCheck=newCommitArray[p];
                    //continue spliting the commit message into commit id, author, date, and commit message
                    let commitId=elementCheck.substring(7,47)
                    let patternOfGitCommitId=/[\w]{40}/
                    if(patternOfGitCommitId.test(commitId) && elementCheck.charAt(47)===" "){
                        validCommitMessage=true;
                        commitIdArray.push(commitId);
                        let Author=elementCheck.split(/(?=Author: )/).pop().split(/(?= Date)/)[0].trim()
                        authorArray.push(Author)
                        let commitTime=elementCheck.split(/(?=(Date: ))/).pop().split(/(?= -)/)[0].trim()
                        timeArray.push(commitTime)
                        let commitMessage=elementCheck.split(/-(\d){4} /).pop().trim()
                        commitMessageArray.push(commitMessage)
                    }else{
                        console.log("Please enter a commit message with a valid commit id.")
                        validCommitMessage=false;
                        break;
                    }
                }
            }else{
                console.log("Please enter a commit git commit with the HEAD pointer")
            }
        }
        if(validCommitMessage){
            for(let k=0;k<newCommitArray.length;k++) {
                let commitId=commitIdArray[k];
                let author = authorArray[k];
                let commitMessage = commitMessageArray[k];
                let commitTime = timeArray[k];
                let commitBox=document.createElement('div')
                commitBox.className="p-5 w-75 align-self-center"
                let parentDiv=document.getElementById("parentDiv")
                let commitTitle=document.createElement('h6')
                //Ticket: can't have two HEADs
                if(newCommitArray[k].includes("HEAD")){
                    commitBox.style.boxShadow="0 0 12px rgb(0,146,205)"
                    commitBox.style.border= "solid rgb(0,146,205)"
                    commitTitle.innerHTML="Commit (Current HEAD)"
                    headId=commitId
                    headTime=commitTime;
                }else{
                    commitTitle.innerHTML="Commit"
                    commitBox.style.border= "solid grey";
                }
                
                commitTitle.style.color="grey"
                commitTitle.style.marginBottom=0;
                commitBox.appendChild(commitTitle);
                let commitIdTitle=document.createElement('h5')
                commitIdTitle.innerHTML=commitId
                commitBox.appendChild(commitIdTitle)
                let authorInformation=document.createElement("li")
                authorInformation.innerHTML = author
                commitBox.appendChild(authorInformation)
                let commitTimeInformation=document.createElement("li")
                commitTimeInformation.innerHTML = commitTime
                commitBox.appendChild(commitTimeInformation)
                let commitMessageInformation=document.createElement("li")
                commitMessageInformation.innerHTML = commitMessage
                commitBox.appendChild(commitMessageInformation)
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
                    polyline.setAttribute("points","50, 2 50, 10") //("(x1,y1) (x2,y2)")
                    polyline.setAttribute("fill","none")
                    polyline.setAttribute("stroke","black")
                    polyline.setAttribute("marker-start","url(#arrowHead)")
                    var defs=document.createElementNS('http://www.w3.org/2000/svg','defs')
                    var arrow=document.createElementNS('http://www.w3.org/2000/svg',"svg")
                    arrow.setAttribute("viewBox","0 0 100 10") //("(x1,y1) (x2,y2)")
                    arrow.setAttributeNS('http://www.w3.org/2000/xmlns/',"xmlns:xlink",'http://www.w3.org/2000/xmlns/')
                    var connectingDiv=document.createElement('div')
                    connectingDiv.id="connectingDiv"+(divCreationCount);
                    connectingDiv.className="d-flex flex-column justify-content-center"
                    parentDiv.appendChild(connectingDiv)
                    connectingDiv.appendChild(arrow)
                    arrow.appendChild(defs)
                    defs.appendChild(marker)
                    marker.appendChild(path)
                    arrow.appendChild(polyline)
                    //plusBox
                    let plusBoxDiv=document.createElement("Card")
                    plusBoxDiv.id="plusBoxDiv"+divCreationCount
                    plusBoxDiv.style.border="solid grey"
                    plusBoxDiv.className="m-auto d-flex flex-column"
                    let plusSymbol=document.createElement("h1")
                    plusSymbol.className="my-0"
                    plusSymbol.id="plusSymbol"+divCreationCount
                    plusSymbol.innerHTML="+"
                    plusBoxDiv.appendChild(plusSymbol)
                    plusSymbol.addEventListener("click", chooseWhichToAdd(plusBoxDiv.id))
                    let commitDecorationBox=document.createElement("div")
                    commitDecorationBox.style.border="solid purple"
                    commitDecorationBox.style.display="none"
                    commitDecorationBox.style.backgroundImage= "url("+"'data:image/svg+xml;charset=UTF-8,%3csvg viewBox='0 0 5 5' xmlns:xlink='http://www.w3.org/2000/xmlns/'%3e%3cpolyline points='0, 0 2, 2' fill='none' stroke='black'%3e%3c/polyline%3e%3c/svg%3e'"+")"
                    /*let titledLines=document.createElementNS('http://www.w3.org/2000/svg',"svg")
                    titledLines.setAttribute("viewBox","0 0 5 5")
                    titledLines.setAttributeNS('http://www.w3.org/2000/xmlns/',"xmlns:xlink",'http://www.w3.org/2000/xmlns/')
                    let line=document.createElementNS('http://www.w3.org/2000/svg',"polyline")
                    line.setAttribute("points","0, 0 5, 5") 
                    line.setAttribute("fill","none")
                    line.setAttribute("stroke","black")
                    titledLines.appendChild(line)
                    commitDecorationBox.appendChild(titledLines)*/
                    let commitDecorationText=document.createElement("P")
                    commitDecorationText.style.fontSize="12px"
                    commitDecorationText.style.border="solid purple"
                    commitDecorationText.style.borderRadius="8px"
                    commitDecorationText.innerHTML="New Commit"
                    commitDecorationBox.appendChild(commitDecorationText)
                    plusBoxDiv.appendChild(commitDecorationBox)
                    let createCommitButton=document.createElement("button")
                    createCommitButton.id="createCommitButton"+divCreationCount
                    createCommitButton.className="btn btn-outline-primary"
                    createCommitButton.innerHTML="Create a new commit"
                    createCommitButton.style.display="none"
                    createCommitButton.style.borderRadius="0"
                    createCommitButton.addEventListener("click",createNewCommit(plusBoxDiv.id))
                    let createBranchButton=document.createElement("button")
                    createBranchButton.id="createBranchButton"+divCreationCount
                    createBranchButton.className="btn btn-outline-primary"
                    createBranchButton.innerHTML="Create a new branch"
                    createBranchButton.style.display="none"
                    createBranchButton.style.borderRadius="0"
                    let backButton=document.createElement("button")
                    backButton.id="backButton"+divCreationCount
                    backButton.className="btn btn-outline-primary"
                    backButton.innerHTML="<--Go Back"
                    backButton.style.display="none"
                    backButton.style.borderRadius="0"
                    plusBoxDiv.appendChild(createCommitButton)
                    plusBoxDiv.appendChild(createBranchButton)
                    plusBoxDiv.appendChild(backButton)
                    connectingDiv.appendChild(plusBoxDiv)
                    const plusBox={}
                    plusBox.id=plusBoxDiv.id
                    plusBox.createCommitButtonId=createCommitButton.id
                    plusBox.createBranchButtonId=createBranchButton.id
                    plusBox.plusSymbolId=plusSymbol.id
                    plusBox.backButtonId=backButton.id
                    plusBoxMap[plusBox.id]=plusBox
                    var arrowTail=document.createElementNS('http://www.w3.org/2000/svg',"svg")
                    arrowTail.setAttribute("viewBox","0 0 100 8") //("(x1,y1) (x2,y2)")
                    arrowTail.setAttributeNS('http://www.w3.org/2000/xmlns/',"xmlns:xlink",'http://www.w3.org/2000/xmlns/')
                    var tailLine=document.createElementNS('http://www.w3.org/2000/svg',"polyline")
                    tailLine.setAttribute("points","50, 0 50, 8") 
                    tailLine.setAttribute("fill","none")
                    tailLine.setAttribute("stroke","black")
                    arrowTail.appendChild(tailLine)
                    connectingDiv.appendChild(arrowTail)
                    
                    
                }
                
                divCreationCount+=1;
                
                commitBox.id="CommitBox"+divCreationCount;
                commitBoxIdArray.push(commitBox.id)
                commitBox.addEventListener("click",divChangeWhenClicked(commitBox.id, commitTime, commitId))
                parentDiv.appendChild(commitBox)
            };   
        }
    }
    //Function that is called when div is clicked
    function divChangeWhenClicked(id, commitTime, commitId){
        return function(){
            //Change Div shadow
            for(let i=0; i<commitBoxIdArray.length;i++){
                if( document.getElementById(commitBoxIdArray[i]).style.border!=="solid rgb(0, 146, 205)"){
                    document.getElementById(commitBoxIdArray[i]).style.boxShadow="";
                }else{
                    document.getElementById(commitBoxIdArray[i]).style.boxShadow="0 0 12px rgb(0, 146, 205)"
                }
            }
            document.getElementById(id).style.boxShadow="0 0 12px grey"
            //Check if commit is commited earlier than head
            //Ticket: confirm if -0400 is GMT+0400
            if(commitTime){
                let currentCommitYear=commitTime.match(/[0-9]{4}$/)
                let currentCommitHrMinSec=commitTime.match(/[0-9]{2}:[0-9]{2}:[0-9]{2}/)
                let currentCommitMonthDay=commitTime.match(/[A-Z][a-z]{2} [0-9]{2}/)
                let currentCommitTime=new Date(currentCommitMonthDay+", "+currentCommitYear+" "+currentCommitHrMinSec)
                let headCommitYear=headTime.match(/[0-9]{4}$/)
                let headCommitHrMinSec=headTime.match(/[0-9]{2}:[0-9]{2}:[0-9]{2}/)
                let headCommitMonthDay=headTime.match(/[A-Z][a-z]{2} [0-9]{2}/)
                let currentHeadTime=new Date(headCommitMonthDay+", "+headCommitYear+" "+headCommitHrMinSec)
                if(commitId!==headId){
                    document.getElementById("messageBox").innerHTML=document.getElementById("messageBox").innerHTML+"git checkout "+String(commitId).match(/[\w]{8}/)  
                }else{
                    document.getElementById("messageBox").innerHTML="Suggests: "
                    
                }
                if(currentHeadTime>currentCommitTime){
                    
                    
                }else{
                    console.log("No")
                }
            }
        }
    }
        
    function chooseWhichToAdd(plusCommitDivId){
        return function(){
            document.getElementById(plusBoxMap[plusCommitDivId].plusSymbolId).innerHTML=""
            document.getElementById(plusBoxMap[plusCommitDivId].createCommitButtonId).style.display="block"
            document.getElementById(plusBoxMap[plusCommitDivId].createBranchButtonId).style.display="block"
            document.getElementById(plusBoxMap[plusCommitDivId].backButtonId).style.display="block"
        }
    }

    function createNewCommit(plusCommitDivId){
        return function(){
            
            document.getElementById(plusBoxMap[plusCommitDivId].createCommitButtonId).style.display="none"
            document.getElementById(plusBoxMap[plusCommitDivId].createBranchButtonId).style.display="none"
        }
    }
    return (
        <>  {/* Note: Use the parent div to make the two elements the same width and have spacing at the same time. 
        As align items center in the parent div doesn't allow it to have spacings*/}
            <Container className="d-flex justify-content-center align-items-center" style={{minHeight:"100vh",minWidth:"100vw"}}>
                
                <div className="d-flex flex-row" style={{minWidth:"1000px"}}>
                    <div className="col p-0 justify-content-center align-items-center"> 
                        <div className="card d-flex w-75 justify-content-center align-items-between flex-column offset-md-2" style={{maxWidth:"600px", border:"solid grey"}}>
                            
                                <div className="d-flex flex-column w-100 justify-content-center align-items-center mb-5">
                                    <input id="commit_information" type="text" className="m-3 w-50" rows="3"/>
                                    <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
                                </div>
                            <Card id="parentDiv" className="d-flex flex-column w-100" style={{"overflowX":"scroll"}}>

                            </Card>
                        </div>    
                    </div>
                    <div className="ml-5 col" style={{ maxWidth:"200px"}}>
                        <Card id="messageBox" className="d-flex flex-column w-100">
                            <p>Suggests: </p>
                        </Card>
                    </div>
                </div>
            </Container>
        </>
        
        
    )
    
}
