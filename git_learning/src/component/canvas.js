import React from 'react'
import {Card} from "react-bootstrap"
import {Container} from "react-bootstrap"
import titledLinesSvg from "../svg/titledLines.svg"
export default function canvas() {
    let divCreationCount=0;
    /////(HEAD can only appear once)
    //Explore what is -0400 in the commit message
    var plusBoxMap={}
    var headId
    var headTime
    var lockCanvas=false
    var stepNumber=0
    var steps
    var currentBranchName
    var clickedItemId;
    var commitArray=[];
    var suggestionMessages=[];
    var createNewCommitGitAddInfo={};
    createNewCommitGitAddInfo.buttonId="createCommitButton"
    createNewCommitGitAddInfo.text="Create New Commit - Git add"
    createNewCommitGitAddInfo.function="addNewCommitDiv"
    createNewCommitGitAddInfo.steps="git add ."
    createNewCommitGitAddInfo.explanation='"git add ." command adds all the revised files'
    suggestionMessages["createNewCommitGitAdd"]=createNewCommitGitAddInfo
    var createNewCommitGitCommitInfo={};
    createNewCommitGitCommitInfo.text="Create New Commit - Git commit"
    createNewCommitGitCommitInfo.function="addNewCommitDiv"
    createNewCommitGitCommitInfo.steps='git commit -m "Add Your Message here between the quotes"'
    createNewCommitGitCommitInfo.explanation='"git commit" saves your changes to the local repository, "git push" pushes your files to a remote repository'
    suggestionMessages["createNewCommitGitCommit"]=createNewCommitGitCommitInfo
    var createNewCommitGitPushInfo={};
    createNewCommitGitPushInfo.text="Create New Commit - Git push"
    createNewCommitGitPushInfo.function="addNewCommitDiv"
    createNewCommitGitPushInfo.steps="git push"
    createNewCommitGitPushInfo.explanation='"git push" pushes your files to a remote repository'
    var createNewBranchInfo={};
    createNewBranchInfo.text="Create New Branch"
    createNewBranchInfo.function="addNewBranchDiv"
    createNewBranchInfo.steps="git "
    createNewBranchInfo.explanation='"git branch" makes a new branch'
    suggestionMessages["createNewCommitGitPush"]=createNewCommitGitPushInfo
    function handleSubmit(){
        ///////////1.Separate the text from input box and store them in an array
        var commitInformation=document.getElementById("commit_information").value
        //var os=require('os')
        //var newLineAndCommit=JSON.stringify(os.EOL).replace('""',"")+"commit"
        let messageTextBox=document.createElement("card")
        messageTextBox.id="messageTextBox"
        let clickDivOptionBox=document.createElement("card")
        clickDivOptionBox.style.display="none"
        clickDivOptionBox.id="clickDivOptionBox"
        let stepsBox=document.createElement("card")
        stepsBox.id="stepsBox"
        let createCommitButton=document.createElement("button")
        createCommitButton.id="createCommitButton"
        createCommitButton.className="btn btn-outline-primary"
        createCommitButton.innerHTML="Create a New Commit after this Commit"
        createCommitButton.style.borderRadius="0"
        createCommitButton.addEventListener("click",createNewCommit())
        let createBranchButton=document.createElement("button")
        createBranchButton.id="createBranchButton"
        createBranchButton.className="btn btn-outline-primary"
        createBranchButton.innerHTML="Create a New Branch after this Commit"
        createBranchButton.style.borderRadius="0"
        let checkoutCommitButton=document.createElement("button")
        checkoutCommitButton.id="checkoutCommitButton"
        checkoutCommitButton.className="btn btn-outline-primary"
        checkoutCommitButton.innerHTML="Get the Code from this Commit"
        checkoutCommitButton.style.borderRadius="0"
        checkoutCommitButton.addEventListener("click",checkoutCommit())
        let confirmStepButton=document.createElement("button")
        confirmStepButton.id="confirmStepButton"
        confirmStepButton.className="btn btn-outline-primary"
        confirmStepButton.innerHTML="Confirm"
        confirmStepButton.style.borderRadius="0"
        confirmStepButton.style.display="none"
        confirmStepButton.addEventListener("click", confirmStep())
        let nextStepsHeader=document.createElement("h5")
        nextStepsHeader.id="nextStepsHeader"
        nextStepsHeader.innerHTML="Next Steps:"
        nextStepsHeader.style.display="none"
        document.getElementById("messageBox").appendChild(clickDivOptionBox)
        document.getElementById("messageBox").appendChild(messageTextBox)
        document.getElementById("messageBox").appendChild(confirmStepButton)
        document.getElementById("messageBox").appendChild(nextStepsHeader)
        document.getElementById("messageBox").appendChild(stepsBox)
        clickDivOptionBox.appendChild(createCommitButton)
        clickDivOptionBox.appendChild(createBranchButton)
        clickDivOptionBox.appendChild(checkoutCommitButton)
        if (commitInformation.startsWith("commit ")){
            if(commitInformation.includes("HEAD")){
                var newCommitArray=commitInformation.split(/(?=\ncommit)/g);
                var validCommitMessage=false;
                //////////////2. Loop through the array and draw the elements dynamically on the website
                for(let p=0;p<newCommitArray.length;p++) {
                    let elementCheck=newCommitArray[p];
                    if (elementCheck.startsWith("\n")){
                        elementCheck=elementCheck.substring(1)
                    }
                    //continue spliting the commit message into commit id, author, date, and commit message
                    let commitId=elementCheck.substring(7,47)
                    let patternOfGitCommitId=/[\w]{40}/
                    if(patternOfGitCommitId.test(commitId) && (elementCheck.charAt(47)===" "||elementCheck.charAt(47)==="\n")){
                        validCommitMessage=true;
                        let Author=elementCheck.split(/(?=Author: )/).pop().split(/(?=Date)/)[0].trim()
                        let commitTime=elementCheck.split(/(?=(Date: ))/).pop().split(/(?= -)/)[0].trim()
                        let commitMessage=elementCheck.split(/-(\d){4}/).pop().trim()
                        console.log(elementCheck.split(/-(\d){4}/).pop().trim())
                        const commitInfo={}
                        commitInfo.id=p+1
                        commitInfo.commitId=commitId
                        commitInfo.commitTime=commitTime
                        commitInfo.commitMessage=commitMessage
                        commitInfo.commitAuthor=Author
                        commitArray.push(commitInfo)
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
            document.getElementById("submitMessageDiv").style.display="none"
            document.getElementById("commit_information").style.display="none"
            document.getElementById("submitCommitMessageButton").style.display="none"
            for(let k=0;k<commitArray.length;k++) {
                let commitId=commitArray[k].commitId;
                let author = commitArray[k].commitAuthor;
                let commitMessage = commitArray[k].commitMessage;
                let commitTime = commitArray[k].commitTime;
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
                    polyline.setAttribute("points","25, 2 25, 10") //("(x1,y1) (x2,y2)")
                    polyline.setAttribute("fill","none")
                    polyline.setAttribute("stroke","black")
                    polyline.setAttribute("marker-start","url(#arrowHead)")
                    var defs=document.createElementNS('http://www.w3.org/2000/svg','defs')
                    var arrow=document.createElementNS('http://www.w3.org/2000/svg',"svg")
                    arrow.setAttribute("viewBox","0 0 50 10") //("(x1,y1) (x2,y2)")
                    arrow.setAttributeNS('http://www.w3.org/2000/xmlns/',"xmlns:xlink",'http://www.w3.org/2000/xmlns/')
                    var connectingDiv=document.createElement('div')
                    connectingDiv.id="connectingDiv"+(divCreationCount);
                    connectingDiv.className="d-flex flex-column w-50 align-self-center justify-content-center"
                    parentDiv.appendChild(connectingDiv)
                    connectingDiv.appendChild(arrow)
                    arrow.appendChild(defs)
                    defs.appendChild(marker)
                    marker.appendChild(path)
                    arrow.appendChild(polyline)
                    let commitDecorationBox=document.createElement("Card")
                    commitDecorationBox.id="commitDecorationBox"+divCreationCount
                    commitDecorationBox.style.border="solid purple"
                    commitDecorationBox.className="mx-auto"
                    commitDecorationBox.innerHTML="New Commit"
                    commitDecorationBox.style.display="none"
                    //commitDecorationBox.style.backgroundImage="url("+titledLinesSvg+")"
                    /*let commitDecorationText=document.createElement("P")
                    commitDecorationText.id="commitDecorationText"+divCreationCount
                    commitDecorationText.style.fontSize="12px"
                    commitDecorationText.style.backgroundColor="white"
                    commitDecorationText.style.border="solid purple"
                    commitDecorationText.style.borderRadius="8px"
                    commitDecorationText.innerHTML="New Commit"
                    commitDecorationBox.appendChild(commitDecorationText)*/
                    connectingDiv.appendChild(commitDecorationBox)
                    var arrowTail=document.createElementNS('http://www.w3.org/2000/svg',"svg")
                    arrowTail.setAttribute("viewBox","0 0 50 10") //("(x1,y1) (x2,y2)")
                    arrowTail.setAttributeNS('http://www.w3.org/2000/xmlns/',"xmlns:xlink",'http://www.w3.org/2000/xmlns/')
                    var tailLine=document.createElementNS('http://www.w3.org/2000/svg',"polyline")
                    tailLine.setAttribute("points","25, 0 25, 10") 
                    tailLine.setAttribute("fill","none")
                    tailLine.setAttribute("stroke","black")
                    arrowTail.appendChild(tailLine)
                    connectingDiv.appendChild(arrowTail)
                    
                    
                }
                
                divCreationCount+=1;
                commitBox.id="CommitBox"+divCreationCount;
                commitBox.addEventListener("click",divChangeWhenClicked(commitArray[k].id, commitTime))
                parentDiv.appendChild(commitBox)
            };   
        }
    }
    //Function that is called when div is clicked
    function divChangeWhenClicked(id, commitTime){
        return function(){
            if(!lockCanvas){
                //Change Div shadow
                let commitId=commitArray[id-1].commitId
                clickedItemId=id;
                for(let i=0; i<commitArray.length;i++){
                    if( document.getElementById("CommitBox"+commitArray[i].id).style.border!=="solid rgb(0, 146, 205)"){
                        document.getElementById("CommitBox"+commitArray[i].id).style.boxShadow="";
                    }else{
                        document.getElementById("CommitBox"+commitArray[i].id).style.boxShadow="0 0 12px rgb(0, 146, 205)"
                    }
                }
                document.getElementById("CommitBox"+id).style.boxShadow="0 0 12px grey"
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
                    if(commitId!==headId&&document.getElementById("clickDivOptionBox").style.display==="none"){
                        //document.getElementById("messageTextBox").innerHTML=document.getElementById("messageTextBox").innerHTML+"git checkout "+String(commitId).match(/[\w]{8}/)
                        document.getElementById("clickDivOptionBox").style.display="block" 
                        if(document.getElementById("commitDecorationBox"+(id-1)).style.display!=="none"){
                            //Ticket:Needs to dynamically create commit so that users can add in more commits
                            document.getElementById("createCommitButton").style.display="none"
                            console.log("need display:"+(id-1))
                        }else{
                            document.getElementById("createCommitButton").style.display="flex"
                            console.log("need display: commitDecorationBox"+(id-1))
                        }
                    }else if(commitId===headId){
                        document.getElementById("messageTextBox").innerHTML=""
                        document.getElementById("clickDivOptionBox").style.display="none"
                         
                    }else{
                        if(document.getElementById("commitDecorationBox"+(id-1)).style.display!=="none"){
                            //Ticket:Needs to dynamically create commit so that users can add in more commits
                            document.getElementById("createCommitButton").style.display="none"
                            console.log("need display:"+(id-1))
                        }else{
                            document.getElementById("createCommitButton").style.display="flex"
                            console.log("need display: commitDecorationBox"+(id-1))
                        }
                    }
                    /*if(currentHeadTime>currentCommitTime){
                        
                        
                    }else{
                        console.log("No")
                    }*/
                }
            }else{
                alert("Please confirm step in suggestion box before going on to the next step.")
            }
        }
    }

    function createNewCommit(){
        return function(){
            if(!lockCanvas){
                lockCanvas=true
                let commitDecorationBoxDivId="commitDecorationBox"+(clickedItemId-1)
                /*if(commitDecorationBoxDivId!==headId){//extract the numbers at the end
                    document.getElementById("messageBox").innerHTML=document.getElementById("messageBox").innerHTML+"git revert "+String(commitDecorationBoxDivId).match(/[\w]{8}/)  
                }else{
                    document.getElementById("messageBox").innerHTML='$git add . $git commit -m "YourMessage" $git push'
                    
                }
                document.getElementById(commitDecorationBoxDivId).style.display="table"
                document.getElementById(commitDecorationBoxDivId).style.display="table-cell"
                document.getElementById(commitDecorationBoxDivId).style.verticalAlign="middle"*/
                document.getElementById(commitDecorationBoxDivId).style.display="flex"
                document.getElementById("clickDivOptionBox").style.display="none" 
                document.getElementById("messageTextBox").innerHTML=(stepNumber+=1)+') $git add .</br>'+(stepNumber+=1)+')$git commit -m "YourMessage"</br>'+(stepNumber+=1)+')$git push</br>'
                document.getElementById("confirmStepButton").style.display="flex"
            }else{
                alert("Please confirm step in suggestion box before going on to the next step.")
            }
        }
    }
    function checkoutCommit(){
        return function(){
            lockCanvas=true
            let commitId=commitArray[clickedItemId-1].commitId
            document.getElementById("messageTextBox").innerHTML=(stepNumber+=1)+") $ git checkout -b <b>random-temporary-branch-name</b> "+
            String(commitId).match(/[\w]{8}/)+"</br>"+(stepNumber+=1)+') git checkout '+"</br>"+(stepNumber+=1)+') git branch -d random-temporary-branch-name'
            document.getElementById("confirmStepButton").style.display="flex"
        }
    }
    function confirmStep(){
        return function(){
            lockCanvas=false
            document.getElementById("confirmStepButton").style.display="none"
            document.getElementById("nextStepsHeader").style.display="flex"
            document.getElementById("stepsBox").innerHTML=document.getElementById("stepsBox").innerHTML+document.getElementById("messageTextBox").innerHTML
            document.getElementById("messageTextBox").innerHTML=''
            
        }
    }
    return (
        <>  {/* Note: Use the parent div to make the two elements the same width and have spacing at the same time. 
        As align items center in the parent div doesn't allow it to have spacings*/}
            <Container className="d-flex justify-content-center align-items-center" style={{minHeight:"100vh",minWidth:"100vw"}}>
                <div className="d-flex flex-row" style={{minWidth:"1000px"}}>
                    <div className="col p-0 justify-content-center align-items-center"> 
                        <div className="card d-flex w-75 justify-content-center align-items-between flex-column offset-md-2" style={{maxWidth:"600px", border:"solid grey"}}>
                            <div id="submitMessageDiv" className="d-flex flex-column w-100 justify-content-center align-items-center mb-5">
                                <textarea id="commit_information" type="text" className="m-3 w-50" rows="3"/>
                                <button id="submitCommitMessageButton" type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
                            </div>
                            <Card id="parentDiv" className="d-flex flex-column w-100" style={{"overflowX":"scroll"}}>

                            </Card>
                        </div>    
                    </div>
                    <div className="ml-5 col" style={{ maxWidth:"200px"}}>
                        <Card id="messageBox" className="d-flex flex-column w-100">
                            <h5>Suggests: </h5>
                        </Card>
                    </div>
                </div>
            </Container>
        </>
        
        
    )
    
}
