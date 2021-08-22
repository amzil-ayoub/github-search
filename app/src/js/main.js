
var method = "GET",
    req = new XMLHttpRequest(),
    searchBtn = document.getElementById("searchBtn"),
    searchInput = document.getElementById("searchInput"),
    dropDiv = document.getElementById("dropDiv"),
    profRes =  document.getElementById("profRes"),
    profRes =  document.getElementById("profRes"),
    ty =  document.getElementById("ty"),
    nm =  document.getElementById("nm"),
    bio =  document.getElementById("bio"),
    em =  document.getElementById("em"),
    frs =  document.getElementById("frs"),
    fling =  document.getElementById("fling"),
    prf =  document.getElementById("prf"),
    repo =  document.getElementById("repo"),
    dt =  document.getElementById("dt"),
    imgDrop = document.getElementById("imgDrop");


searchBtn.onclick=function(){
    if(searchInput.value.trim().length>0){
        req.onreadystatechange =function(){
            if(this.readyState==4&&this.status==200){
                var objGit = JSON.parse(this.responseText);
                if(objGit.length==0){
                        console.log("what you are looking for, is not found!");
                    }else{
                        profRes.innerHTML="";
                        for(let i=0;i<objGit.items.length;i++){ 
                            var divProfile = document.createElement("div"),
                                profId = document.createAttribute("data-profile-id"),
                                imgSrc = document.createAttribute("src"),
                                pProfile =  document.createElement("p"),
                                sProfileLg =  document.createElement("span"),
                                imgProfile =  document.createElement("img"),
                                profileId;
                            divProfile.classList.add("col-md-3","profile","ui-draggable","ui-draggable-handle");
                            profId.value = objGit.items[i].login;            
                            divProfile.setAttributeNode(profId);
                            sProfileLg.innerHTML = objGit.items[i].login;
                            pProfile.appendChild(sProfileLg);
                            imgSrc.value = objGit.items[i].avatar_url;
                            imgProfile.setAttributeNode(imgSrc);
                            divProfile.appendChild(pProfile); 
                            divProfile.appendChild(imgProfile);
                            profRes.appendChild(divProfile);
                            
                            $( function() {
                                $( ".profile" ).draggable({
                                    drag: function( event, ui ) {
                                        profileId = $(this).attr("data-profile-id");
                                        if($('.profileDrop').hasClass('ui-droppable-hover')){
                                            $('.profileDrop').css('border','2px dotted gold');
                                        }else{$('.profileDrop').css('border','2px dashed #ccc');}
                                    }
                                });
                                $(".profileDrop").droppable({
                                    drop:function(event,ui){
                                        //dropDiv.innerHTML="";
                                        req.onreadystatechange =function(){
                                            if(this.readyState==4&&this.status==200){
                                                var objGitProfile = JSON.parse(this.responseText);
                                                    

                                                imgSrcDrop = document.createAttribute("src");
                                                imgSrcDrop.value = objGitProfile.avatar_url;
                                                imgDrop.setAttributeNode(imgSrcDrop);
                                                aProfile = document.createAttribute("href");
                                                aProfile.value = objGitProfile.html_url;
                                                prf.setAttributeNode(aProfile); 
                                                aRepo = document.createAttribute("href");
                                                aRepo.value = objGitProfile.html_url+"?tab=repositories";
                                                repo.setAttributeNode(aRepo); 
                                                dt.innerHTML = objGitProfile.created_at.slice(0,10);
                                                fling.innerHTML = objGitProfile.following;
                                                frs.innerHTML = objGitProfile.followers;
                                                bio.innerHTML = objGitProfile.bio;
                                                em.innerHTML = objGitProfile.email;
                                                nm.innerHTML = objGitProfile.name;
                                                ty.innerHTML = objGitProfile.type;
                                                                              
      
                                                }// end if server/requ status
                                            }// end onreadystatechange 
                                                var  urlProfile  = 'https://api.github.com/users/'+profileId;
                                                req.open(method,urlProfile,true);
                                                req.send();
                                    }
                                });
                            });

                        }// end for
                    }// end else        
            }// end if server/requ status

        }// end onreadystatechange 

        var q = searchInput.value.trim().replace(/[ ]/igm,"+").trim(),
            url  = 'https://api.github.com/search/users?q='+q;

        req.open(method,url,true);
        req.send();
    }else{

        var error = document.createTextNode("Empty field"),
            msg = document.getElementById("msg");
        msg.classList.add("msgStyle");
        msg.appendChild(error);

        setTimeout(function(){
                msg.classList.remove("msgStyle");
                msg.innerHTML="";
            }, 2000);
    };
};// end click function 


// drag/drop functions

$( function() {
    $( ".profile" ).draggable({
        drag: function( event, ui ) {
            profileId = $(this).attr("data-profile-id");

            if($('.profileDrop').hasClass('ui-droppable-hover')){
                $('.profileDrop').css('border','2px dotted gold');
            }else{$('.profileDrop').css('border','2px dashed #ccc');}
        }
    });
});  


