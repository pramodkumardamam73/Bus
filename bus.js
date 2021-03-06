var Bus = {
	delay : 50, 
	functions : new Array(), 
	timer : null, 
	currentTime : 0, 

	/* Measures */ 
	time : {
		mil	: 1, 
		sec : 1000, 
		min : 60000, 
		to : function(unit){
			if(unit=='mil'){
				return Bus.currentTime; 
			}else if(unit=='sec'){
				return Bus.currentTime/1000; 
			}else if(unit=='min'){
				return Bus.currentTime/60000; 
			} return null; 
		},
		isSec : function(n){
			if(!n)
				n=1;
			if((Bus.currentTime%(1000*n))==0)
				return true;
			else
				return false;
		},
		isMin : function(n){
			if((Bus.currentTime%(60000*n))==0)
				return true;
			else
				return false;
		},
		isSecOnce : function(n){
			if(!n)
				n=1;
			if(Bus.time.to('sec')==n)
				return true;
			else
				return false;
		},
		isMinOnce : function(n){
			if(!n)
				n=1;
			if(Bus.time.to('min')==n)
				return true;
			else
				return false;
		}
	}, 
	add : function(func){
		Bus.functions.push(func); 
	}, 
	start : function(n){
		console.log('@Bus started@');
		if(!n)
			this.delay = 100;
		else
			this.delay = 1000/n;
		Bus.timer=setTimeout(Bus.helper,Bus.delay); 
	}, 
	run : function(){
		if(Bus.timer){
			for(i=0;i<Bus.functions.length;i++){
				Bus.functions[i](); 
			} if(Bus.timer){
				Bus.currentTime += Bus.delay; 
				Bus.tcurrentTimeimer=setTimeout(Bus.helper,Bus.delay); 
			} 
		} 
	}, 
	pause : function(){
		clearTimeout(Bus.timer); 
		Bus.timer=null; 
	}, 
	helper : function(){
		Bus.run(); 
	}, 
	at : function(time,func){
		var handle = function(){
			if(Bus.currentTime==time){
				func(); 
			} 
		} 
		Bus.add(handle); 
	}, 
	every : function(time,func){
		var handle = function(){
			if(Bus.currentTime%time==0){
				func(); 
			} 
		} 
		Bus.add(handle); 
	}, 
	from : function(time,func){
		var handle = function(){
			if(Bus.currentTime>time){
				func(); 
			} 
		} 
		Bus.add(handle); 
	}, 
	till : function(time,func){
		var handle = function(){
			if(Bus.currentTime<time){
				func(); 
			} 
		} 
		Bus.add(handle); 
	}, 
	between : function(from,to,func){
		var handle = function(){
			if(Bus.currentTime>from && Bus.currentTime<to){
				func(); 
			} 
		} 
		Bus.add(handle); 
	}
}