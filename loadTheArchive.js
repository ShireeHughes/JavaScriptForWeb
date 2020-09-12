function LoadTheArchive(TotalFeed) 
{
    if("entry" in TotalFeed.feed) 
    {
       var PostEntries=TotalFeed.feed.entry.length;
console.log(PostEntries);

       var PostArray = []; 
       for(var PostNum=0; PostNum<PostEntries ; PostNum++) 
       {
          var ThisEntry = TotalFeed.feed.entry[PostNum];
     
         //get Thumb URL
        var ThisPostThumb;
        try{
          ThisPostThumb=ThisEntry.media$thumbnail.url;
          ThisPostThumb=ThisPostThumb.replace("/s72-c/","/s200-c/");

         if(ThisPostThumb.indexOf("/s200-c/")==-1){ThisPostThumb="http://3.bp.blogspot.com/-Yw8BIuvwoSQ/VsjkCIMoltI/AAAAAAAAC4c/s55PW6xEKn0/s200-c/nth.png";}
        }catch(error)
        {
          ThisPostThumb="http://3.bp.blogspot.com/-Yw8BIuvwoSQ/VsjkCIMoltI/AAAAAAAAC4c/s55PW6xEKn0/s200-c/nth.png";//'http://2.bp.blogspot.com/-Gbn3dT1R9Yo/VPXSJ8lih_I/AAAAAAAALDQ/24wFWdfFvu4/s000/sorry-image-not-available.png';
        }


     //get URL
     var ThisPostURL;
     for(var LinkNum=0; LinkNum < ThisEntry.link.length; LinkNum++) 
     {
        if(ThisEntry.link[LinkNum].rel == "alternate") 
        {
          ThisPostURL = ThisEntry.link[LinkNum].href;
          break;
        }
     }

     var ThisPost = {
        title: ThisEntry.title.$t,
        year: ThisEntry.published.$t.substring(0,4),
        month:ThisEntry.published.$t.substring(5,7),
        day: ThisEntry.published.$t.substring(8,10),
        update_year: ThisEntry.updated.$t.substring(0,4),
        update_month:ThisEntry.updated.$t.substring(5,7),
        update_day: ThisEntry.updated.$t.substring(8,10),
        url:ThisPostURL,
        summary:ThisEntry.summary.$t,
        thumb:ThisPostThumb
     };
     PostArray.push(ThisPost);
    }

    DisplaytheTOC(PostArray);
    }
}


function DisplaytheTOC(PostArray)
{
if(!monthArchive) {
  document.write('<div class="archive-outer"><ul>');
}

    var MonthNames=["January","February","March","April","May","June","July","August","September","October","November","December"];
    var NumberOfEntries=PostArray.length;
    var currentMonth = "";
    var currentYear = -1;
var flag = false;
    
    for(var EntryNum = NumberOfEntries-1; EntryNum >= 0; EntryNum--)
    {
        NameOfMonth = MonthNames[parseInt(PostArray[EntryNum].month,10)-1]
        UpdateNameOfMonth = MonthNames[parseInt(PostArray[EntryNum].update_month,10)-1]
             
        var writeSum = PostArray[EntryNum].summary;
        var endNdx = writeSum.indexOf("<!--");
       if(endNdx != -1) { writeSum = writeSum.substring(0, endNdx);}
      else {writeSum = writeSum.substring(0,200);}

     if(monthArchive) {
       if(currentYear != PostArray[EntryNum].year && document.getElementById(PostArray[EntryNum].year)==undefined) {
         if(flag) { document.write('</ul></div>');  flag = false;}
         document.write('<h2 class="' + PostArray[EntryNum].year+ '" id="' + PostArray[EntryNum].year + '">' + PostArray[EntryNum].year + '</h2>');
         currentYear = PostArray[EntryNum].year;
         currentMonth = "";
       }
       if(currentMonth != NameOfMonth) {
         if(flag) { document.write('</ul></div>'); }
         if(document.getElementById(NameOfMonth+PostArray[EntryNum].year)==undefined){ document.write('<h3 class="' + PostArray[EntryNum].year + '" id="' + NameOfMonth + PostArray[EntryNum].year + '">' + NameOfMonth +' ' + PostArray[EntryNum].year + '</h3>'); }
         currentMonth = NameOfMonth;
         document.write('<div class="archive-outer"><ul>');
         flag = true;
       }
       document.write('<li class="archivePosts"><div class="item-thumbnail"><a href="' + PostArray[EntryNum].url + '"><img src="' + PostArray[EntryNum].thumb + '" /></a></div><div class="item-title"><a href="' + PostArray[EntryNum].url + '">'+ PostArray[EntryNum].title + '</a></div></li>');
     } else{
       if(PostArray[EntryNum].url != document.URL) {     
document.write('<li class="archivePosts"><div class="item-thumbnail"><a href="' + PostArray[EntryNum].url + '"><img src="' + PostArray[EntryNum].thumb + '" /></a></div><div class="item-title"><a href="' + PostArray[EntryNum].url + '">'+ PostArray[EntryNum].title + '</a></div></li>');
       }
     }
    }
    document.write('</ul></div">');
//if(!monthArchive) {
    document.write('</div>');
//}

}

function DisplaytheTOCArchive(PostArray)
{
document.write('<div class="archive-outer"><ul>');

    var MonthNames=["January","February","March","April","May","June","July","August","September","October","November","December"];
    var NumberOfEntries=PostArray.length;
    
    for(var EntryNum = NumberOfEntries-1; EntryNum >= 0; EntryNum--)
    {
       
        NameOfMonth = MonthNames[parseInt(PostArray[EntryNum].month,10)-1]
        UpdateNameOfMonth = MonthNames[parseInt(PostArray[EntryNum].update_month,10)-1]
             
        var writeSum = PostArray[EntryNum].summary;
        var endNdx = writeSum.indexOf("<!--");
       if(endNdx != -1) { writeSum = writeSum.substring(0, endNdx);}
      else {writeSum = writeSum.substring(0,200);}
      if(PostArray[EntryNum].url != document.URL) {     
document.write('<li class="archivePosts"><div class="item-thumbnail"><a href="' + PostArray[EntryNum].url + '"><img src="' + PostArray[EntryNum].thumb + '" /></a></div><div class="item-title"><a href="' + PostArray[EntryNum].url + '">'+ PostArray[EntryNum].title + '</a></div><div class="date"><p class="published">Written: ' + NameOfMonth + ' ' + PostArray[EntryNum].day + ', ' + PostArray[EntryNum].year + '</p><p class="updated">Updated: ' + UpdateNameOfMonth + ' ' + PostArray[EntryNum].update_day + ', ' + PostArray[EntryNum].update_year + '</p></div><div class="item-snippet">'+ writeSum +'<span class="read-more"><a href="'+ PostArray[EntryNum].url +'">Read More</a></span></div></li>');
      }
    }
document.write('</ul></div">');

}