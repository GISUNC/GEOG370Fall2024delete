// Code to creates a schedule for GEOG370
// First enter the variables related to feriados y el comienzo de classes
// Indica si es una clase de Lunes y Miercoles of de Martes y Jueves. 
// El codigo crea un objeto global llamado 'daObj' que puedes agarrar como JSON y crear luego la variable schedule en el scheduls.js

// To do make color codes and change dates of titles, like for example from Spring to Fall and that kind of thing. 
var UNCdates = {
    year: 2024,
    semester: "Fall ",
    days: "Mon-Wed", // "Mon-Wed" or "Tue-Thu"
    time: '2:30pm-3:45pm',
    officeHours:"Mondays from 4:00pm to 5:30pm",
    feriados: ['Mon Sept 2','Tue Sept 3', 'Mon Sept 23' , 'Thu Oct 17', 'Fri Oct 18','Wed Nov 27' , 'Thu Nov 28' , 'Fri Nov 29'], //'Fri Oct 11'
    firstMonday: 'Mon Aug 19 2024', //
    firstDayOfClass: 'Mon Aug 19 2024', // Actual first day the class meets. Make sure it has the year
    classesEnd: 'Wed Dec 4 2024',
    recitationOne: {day:"Fri",time:'1:25PM - 2:15PM'},
    recitationTw0: {day:"Thu",time:'2:00PM - 2:50PM'},
    conflict:0,
    alert: 'on',
    hw:{
        'hw1':9,
        'hw2':9,
        'hw3':7,
        'hw4':14,
        'hw5':7,
        // 'hw6pt1':7,
        'hw6pt2':7,
        'hw7': 14, // fall break
        'hw8':7,
        'hw9':7,
        'hw10':10,
        },
        topics:{
            day1:'Introduction to class',
            day2:'Introduction to data types and how we model the world',  
            day3:'Work with HW1 and GPS',
            day4:'GPS',
            day5:'Projections',
            day6:'Practical Quiz 1',
            day7:'Projections pt 2',
            day8:'Georeferencing',
            day9:'Tables', // Test
            day10: 'Choropleths',// 'Webmaps',
            day11: 'Practical Quiz 2', //'Tables',
            day12: 'Classification Schemes and Ratios',
            day13: 'Midterm',// check date
            day14: 'Apply classification and ratios to your data',
            day15: 'Vector Spatial Analysis',
            day16: 'Introduction to Rasters and to GEE',
            day17: 'Practical Quiz 3',//
            day18: 'Cartography / Vector Spatial Analysis Practice',
            day19: 'Color Theory',//'Introduction to Rasters and to GEE',
            day20: 'Present your maps HW7 & HW8',
            day21: 'Intro to remote sensing pt1',
            day22: 'Intro to remote sensing pt2',
            day23: 'Practical Quiz 4',
            day24: 'Work on remote sensing presentation',
            day25: 'Remote Sensing Presentation',
            day26: 'Remote Sensing Presentation',
            day27: 'Remote Sensing Recap',
            day28: 'Topography and elevation models',
            day29: 'RECAP',
            FinalExam: 'FINAL EXAM'
        },
    removeIfNotDate(days){
        if(days===undefined){
            console.log('using 10 days')
            days = 10;         
        }
            var currentDate = new Date()
            console.log(currentDate)
            var tagDates = document.getElementsByClassName('date') 
            var deadline = new Date(tagDates[0].innerHTML)//.split(' at 11:55 pm')[0])
            // I should create an error message 
            var delta = (deadline - currentDate)/ (60*60*24*1000)
            if (delta<days){return}
            else {document.body.innerHTML = 'Thanks for checking the homework instructions early.<br> The instructions for this homework will be posted at least two weeks before the deadline.' }
    },

    addDatesToHTML(){
        this.sumDates();
        this.writeDates()
    },
    sumDates(){
            var t = new Date(this.firstMonday)
            console.log(t)
            Object.keys(this.hw).forEach((e,i)=>{
                    t.setDate(t.getDate()+ this.hw[e])
                // console.log(t.toDateString())
                this.hw[e] = t.toDateString() //left it as date 
                this.verifyDates(t,e)
                })
    } ,  
    writeDates(){
        var tagDates = document.getElementsByClassName('date')
        for (var i=0; i<tagDates.length; i++){
        tagDates[i].innerHTML = (this.hw[tagDates[i].innerHTML])  //+ ' at 11:55 pm' // I should add an error control here in case there is no key for the date
    }
    },

    beforeDate(){ // i will only apply a one week before HW rule in the future I should try to code it similar to assignScheduleDate so I can add different dates if needed. 
        var tagDates = document.getElementsByClassName('before')
        for (var i=0; i<tagDates.length; i++){
            var date = new Date(Date.parse(this.hw[tagDates[i].innerHTML]) - (1000*60*60*24*6))
            console.log((date.toDateString()))
            tagDates[i].innerHTML = (date.toDateString()) // I should add an error control here in case there is no key for the date
    }

    },
    verifyDates(hwDate, daHW){
        if (hwDate > new Date(this.classesEnd)) {alert(daHW + " is after the last day")}
        this.feriados.forEach((e)=>
            
        {   
            feriado = new Date(e + ' ' + this.year);       
            if (feriado.toDateString() == hwDate.toDateString()) {
                if (this.alert == 'on'){alert(daHW + " has a conflict on " + feriado.toDateString())}
                return this.conflict = 1;
                }     
                
            })
        },

    fromDayToNextDay(daDate) {
        if(this.days ==  "Mon-Wed"){
        if (daDate.getDay() == 1){
            daDate.setDate(daDate.getDate()+ 2)}
            else {
            daDate.setDate(daDate.getDate()+ 5)}}
        
        if(this.days ==  "Tue-Thu"){
        if (daDate.getDay() == 2){
        daDate.setDate(daDate.getDate()+ 2)}
        else {
        daDate.setDate(daDate.getDate()+ 5)}
        }
    },


    makeTable(daTopic, daDateString)
        { 
        // daTable = document.getElementById(tableID)
        // console.log(daTable)    
        const tr = document.createElement('tr');
        const thDay = document.createElement('td');
        const thActivity = document.createElement('td');
        thDay.innerHTML = daDateString
        tr.appendChild(thDay)
        thActivity.innerHTML = daTopic;
        daObj[daDateString] = daTopic;
        tr.appendChild(thActivity);
        daTable.appendChild(tr)},

    makeSchedule(tableID){
        daObj = { }
        daTable = document.getElementById(tableID)
        var daDate = new Date(this.firstDayOfClass)
        Object.keys(this.topics).forEach((e,i)=>{
        if(e == 'FinalExam'){
            this.makeTable("Final Exam", 'Check official calendar')
            return}
        // console.log(i)
        if(i>0){this.fromDayToNextDay(daDate)}
        this.verifyDates(daDate,e)
        while (this.conflict == 1){ 
            // console.log('conflict')
            this.conflict = 0;
            var daTopic = 'No Classes'
            this.makeTable(daTopic, daDate.toDateString())
            this.fromDayToNextDay(daDate)
            this.verifyDates(daDate,e)
        }
        if (this.conflict == 0){
            this.makeTable(this.topics[e], daDate.toDateString())
        }
        
    })
    alert("the object 'daObj' has been created")
    console.log(daObj)
    },
    assignScheduleDate(schedule) { // requires a JSON with the schedule verified. 
        var sch = document.getElementsByClassName('schedule')
        for (var i=0;i<sch.length;i++){
            // var e = sch[i].innerHTML.split('{').filter(e => e.includes('}'))[0].split('}')[0]
            var words = sch[i].innerHTML.split('{')
            console.log(words.toString())
            for (var j=0; j < words.length; j++)
            {
                if (words[j].match('}') != null){
                    
                    var daKey = words[j].split('}')[0]
                    Object.keys(schedule).forEach((e)=>{
                        if (schedule[e]==daKey) { 
                            var words2 = words[j].split('}')
                            words2[0] = e
                            words[j] = words2.join(' ')
                            sch[i].innerHTML = words.join(' ')
                        }

                    })
                }
            }
        }
}
}

// UNCdates.sumDates()
// UNCdates.writeDates()

