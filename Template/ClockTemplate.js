(function (tileDataContext, $, undefined) {
    (function (templates) {
        (function (template) {

            template.PreContainerProcess = function (options) {

                var deferred = $.Deferred();
                var defaults = {
                    html: undefined,
                    TileTitle: undefined
                };

                var settings = $.extend({}, defaults, options);
                var element = $(settings.html);
                $('.tbc-title', element).html(settings.TileTitle);
                deferred.resolve();

                return deferred;
            };

            template.PostContainerProcess = function (options) {

                var deferred = $.Deferred();
                
                var defaults = {
                    animatedTile: undefined,
                    tileContainer: undefined
                };

                var settings = $.extend({}, defaults, options);

                // $('.prevslide', settings.tileContainer).click(function () {
                //     $(settings.animatedTile).liveTile("goto", "prev");

                // });
                // $('.nextslide', settings.tileContainer).click(function () {
                //     $(settings.animatedTile).liveTile("goto", "next");
                // });
                deferred.resolve();

                return deferred;
            };

            template.GetData = function (options) {
                /// <summary>
                /// Implement custom data access function. To this method to be invoked, customDataAccess property 
                /// must set to true in template
                /// </summary>
                /// <param name="options" type="type">
                /// { fields: undefined, parameter: undefined, data: undefined }
                /// 
                /// fields: Fields expected by engine
                /// parameter: Applies only when requeted by inner field. This container field name.
                /// data: Applies only when final data access. Contains user input for all fields.
                /// </param>
                /// <returns type=""></returns>
                var deferred = $.Deferred();


                var defaults = { fields: undefined, parameter: undefined, data: undefined, cacheInfo: undefined, listName: undefined, cell: undefined };
                var settings = $.extend({}, defaults, options);
                
                deferred.resolve([]);
                return deferred;
            }

            template.PostDataProcess = function (html, options, containerInfo, currentTemplate) {
                var deferred = $.Deferred();

                var defaults = {
                    Direction: undefined,
                    Delay: undefined, Bounce: undefined, AnimationDirection: undefined, Speed: undefined, ClockType: undefined, TileBackground: undefined, ClockBackground: undefined, NumbersColor: undefined, ClockRimOuter: undefined, ClockRimMiddle: undefined, ClockHands: undefined, ClockTheme: undefined, ClockMode: undefined
                };
                var settings = $.extend({}, defaults, options);

                var element = $(html);

                
                
                switch(settings.ClockTheme){
                    case "Black":
                        settings.TileBackground = "#000000";
                        settings.ClockBackground = "#000000";
                        settings.NumbersColor = "#ffffff";
                        settings.ClockRimOuter = "#000000";
                        settings.ClockRimMiddle = "#ffffff";
                        settings.ClockHands = "#ffffff";
                        break;
                    case "Blue":
                        settings.TileBackground = "#0000FF";
                        settings.ClockBackground = "#000000";
                        settings.NumbersColor = "#ffffff";
                        settings.ClockRimOuter = "#000000";
                        settings.ClockRimMiddle = "#ffffff";
                        settings.ClockHands = "#ffffff";
                        break;
                    case "Red":
                        settings.TileBackground = "#FF0000";
                        settings.ClockBackground = "#000000";
                        settings.NumbersColor = "#ffffff";
                        settings.ClockRimOuter = "#000000";
                        settings.ClockRimMiddle = "#ffffff";
                        settings.ClockHands = "#ffffff";
                        break;
                    case "Purple":
                        settings.TileBackground = "#FF00FF";
                        settings.ClockBackground = "#000000";
                        settings.NumbersColor = "#ffffff";
                        settings.ClockRimOuter = "#000000";
                        settings.ClockRimMiddle = "#ffffff";
                        settings.ClockHands = "#ffffff";
                        break;
                    case "Green":
                        settings.TileBackground = "#00FF00";
                        settings.ClockBackground = "#000000";
                        settings.NumbersColor = "#ffffff";
                        settings.ClockRimOuter = "#000000";
                        settings.ClockRimMiddle = "#ffffff";
                        settings.ClockHands = "#ffffff";
                        break;
                    case "Yellow":
                        settings.TileBackground = "#FFFF00";
                        settings.ClockBackground = "#000000";
                        settings.NumbersColor = "#ffffff";
                        settings.ClockRimOuter = "#000000";
                        settings.ClockRimMiddle = "#ffffff";
                        settings.ClockHands = "#ffffff";
                        break;
                        
                    default:
                        
                }
                
                $(element).css('background-color', settings.TileBackground);
                
                if(settings.ClockType == "Analog"){
                    switch(containerInfo.Mode) {
                    case "Small":
                        $(".single-item",element).html("<div id='analogCanvas' style='float: left; width: 100%; height: 100%;'></div>"); 
                        break;
                    case "Large":
                            $(".single-item",element).html("<div id='analogCanvas' style='float: left; width: 100%; height: 100%; margin-left: 25%;'></div>"); 
                        break;
                    case "ExtraLarge":
                            $(".single-item",element).html("<div id='analogCanvas' style='float: left; width: 100%; height: 100%;'></div>"); 
                        break;
                    // case "Universal":
                    //     code block
                    //     break;
                    default:
                    }
                
                    var canvas = document.createElement('canvas');
                    canvas.setAttribute('style', 'width: auto; height: 100%');
                    var ctx = canvas.getContext("2d");
                    var radius = canvas.height / 2;
                    ctx.translate(radius, radius);
                    radius = radius * 0.90
                    setInterval(drawClock, 1000);


                    function drawClock() {
                      drawFace(ctx, radius);
                      drawNumbers(ctx, radius);
                      drawTime(ctx, radius);
                    }

                    function drawFace(ctx, radius) {
                      var grad;
                      ctx.beginPath();
                      ctx.arc(0, 0, radius, 0, 2*Math.PI);
                      ctx.fillStyle = settings.ClockBackground;
                      ctx.fill();
                      grad = ctx.createRadialGradient(0,0,radius*0.95, 0,0,radius*1.05);
                      grad.addColorStop(0, settings.ClockHands);
                      grad.addColorStop(0.5, settings.ClockRimMiddle);
                      grad.addColorStop(1, settings.ClockRimOuter);
                      ctx.strokeStyle = grad;
                      ctx.lineWidth = radius*0.1;
                      ctx.stroke();
                      ctx.beginPath();
                      ctx.arc(0, 0, radius*0.1, 0, 2*Math.PI);
                      ctx.fillStyle = settings.NumbersColor;
                      ctx.fill();
                    }

                    function drawNumbers(ctx, radius) {
                      var ang;
                      var num;
                      ctx.font = radius*0.15 + "px arial";
                      ctx.textBaseline="middle";
                      ctx.textAlign="center";
                      for(num = 1; num < 13; num++){
                        ang = num * Math.PI / 6;
                        ctx.rotate(ang);
                        ctx.translate(0, -radius*0.85);
                        ctx.rotate(-ang);
                        ctx.fillText(num.toString(), 0, 0);
                        ctx.rotate(ang);
                        ctx.translate(0, radius*0.85);
                        ctx.rotate(-ang);
                      }
                    }

                    function drawTime(ctx, radius){
                        var now = new Date();
                        var hour = now.getHours();
                        var minute = now.getMinutes();
                        var second = now.getSeconds();
                        //hour
                        hour=hour%12;
                        hour=(hour*Math.PI/6)+
                        (minute*Math.PI/(6*60))+
                        (second*Math.PI/(360*60));
                        drawHand(ctx, hour, radius*0.5, radius*0.07);
                        //minute
                        minute=(minute*Math.PI/30)+(second*Math.PI/(30*60));
                        drawHand(ctx, minute, radius*0.8, radius*0.07);
                        // second
                        second=(second*Math.PI/30);
                        drawHand(ctx, second, radius*0.9, radius*0.02);
                    }

                    function drawHand(ctx, pos, length, width) {
                        ctx.beginPath();
                        ctx.lineWidth = width;
                        ctx.lineCap = "round";
                        ctx.moveTo(0,0);
                        ctx.rotate(pos);
                        ctx.lineTo(0, -length);
                        ctx.stroke();
                        ctx.rotate(-pos);
                    }
                    
                    document.getElementById("analogCanvas").appendChild(canvas);
                }
                
                if(settings.ClockType == "Digital"){
                    switch(containerInfo.Mode) {
                    case "Small":
                        $(".clock",element).html("<div style='margin-left: 4%;margin-top: 20%;' id='digitalCanvas'></div>");
                        $(".clock-mode",element).css('margin-left', '75%'); 
                        $(".clock-mode",element).css('font-size', '135%');
                        break;

                    case "Large":
                            $(".clock",element).html("<div id='digitalCanvas'></div>");
                            $(".clock-mode",element).css('margin-top', '-8%');
                            $(".clock-mode",element).css('margin-left', '85%');
                            $(".clock-mode",element).css('font-size', '150%');
                        break;
                    case "ExtraLarge":
                            $(".clock",element).html("<div style='margin-left: 5%;margin-top: 25%;' id='digitalCanvas'></div>"); 
                            $(".clock-mode",element).css('margin-left', '82%');
                            $(".clock-mode",element).css('font-size', '200%');
                        break;
                    // case "Universal":
                    //     code block
                    //     break;
                    default:
                    }
                    
                    var canvas = document.createElement('canvas');
                    canvas.setAttribute('style', 'width: 95%; height: auto');
                    var context;
                    var d;
                    var str;
                    function getClock()
                    {
                        //Get Current Time
                        d = new Date();
                        str = prefixZero(d.getHours(), d.getMinutes(), d.getSeconds());
                        //Get the Context 2D or 3D
                        context = canvas.getContext("2d");
                        context.clearRect(0, 0, 500, 200);
                        context.font = "78px Arial";
                        context.fillStyle = settings.NumbersColor;
                        context.fillText(str, 0, 110);
                    }

                    function prefixZero(hour, min, sec)
                    {
                        var curTime;
                        var curTimeText;
                        if(settings.ClockMode == "AM PM"){
                            
                            if(hour>12){
                                curTimeText = "PM"
                                hour = (hour%12);
                                
                                if(hour < 10)
                                curTime = "0"+hour.toString();
                                    else
                                curTime = hour.toString();

                             }
                             else{
                                curTimeText = "AM"
                                if(hour < 10)
                                curTime = "0"+hour.toString();
                                    else
                                curTime = hour.toString(); 
                             }
                        }
                        
                        else{
                            
                             if(hour < 10)
                                curTime = "0"+hour.toString();
                             else
                                curTime = hour.toString(); 
                        }
                        
                            if(min < 10)
                                curTime += ":0"+min.toString();                           
                             else
                                curTime += ":"+min.toString();  

                             if(sec < 10)
                                curTime += ":0"+sec.toString();                           
                             else
                                curTime += ":"+sec.toString();
                        
                        if(settings.ClockMode == "AM PM"){
                            $(".clock-mode",element).html("<div>"+curTimeText+"</div>"); 
                            $(".clock-mode",element).css('color', settings.NumbersColor); 
                        }
                            return curTime;
                         
                    }
                    
                    setInterval(getClock, 1000);
                    document.getElementById("digitalCanvas").appendChild(canvas);
                }              

                deferred.resolve(element);
                return deferred;
            };

            template.PostCssProcess = function (html, options, containerInfo, currentTemplate) {
                var deferred = $.Deferred();
                var defaults = { FeedUrl: undefined };
                var settings = $.extend({}, defaults, options);
                var element = $(html);
                deferred.resolve(element);
                return deferred;
            };

        }(templates.ClockTemplate = templates.ClockTemplate || {}));
    }(tileDataContext.Templates = tileDataContext.Templates || {}));
}(window.TileDataContext = window.TileDataContext || {}, jQuery));