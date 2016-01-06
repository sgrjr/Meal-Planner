var consumer = "aw";
var excerciseId = "001";
var list_weeks = ['20160103','20160110','20160117','20160124','20160131'];
var table = '';
var lists = {};
var lists_names = ['breakfast','lunch','dinner','snack','shopping'];

function getFromJSON(objectToSearch,valueToFind){
	var value = jQuery.grep(objectToSearch, function(obj) { 
		return obj.id == valueToFind;
		});
		
	return value[0];
}

/////////////////////////////////////
///////////////////////////////start
/////////////////////////////////////

 $(document).ready(function () { // load json file using jquery ajax
	
	list_weeks.map(function(week){
		
		var data = {};
		var excerciseTips = {};
		var date_id = week;
		var data_file = 'data/'+consumer+'/'+date_id+'.json';
		var excercise_file = 'data/'+consumer+'/et_'+excerciseId+'.json';
		var shoppinglist_file = 'data/shopping-list.json';

		var list_files = [
			"data/breakfast-list.json",
			"data/lunch-list.json",
			"data/dinner-list.json",
			"data/snack-list.json",
			"data/shopping-list.json"
		];

		list_files.map(function(key,value){
			lists[lists_names[value]] = JSON.parse($.ajax({type: "GET", url: key, async: false}).responseText).data;
		});
			
		data = JSON.parse($.ajax({type: "GET", url: data_file, async: false}).responseText);
			
		lists.excerciseTips = JSON.parse($.ajax({type: "GET", url: excercise_file, async: false}).responseText).data;
		
		table = table + "<div class='top-of-page'></div><table><tbody><tr>";
		
		table = table + "<td colspan='2' id='wfsbox'>Woodford's Family Services<br> Residential Program<br><br> <strong>Weekly Menu Plan Sheet</strong></td>";
		table = table + "<td colspan='4'>";
		table = table + "<h1>"+data.initials+"'s Plan</h1>";
		table = table + "<h2>Week of: "+data.dateRange+"</h2>";
		table = table + "</td>";
		table = table + "<td colspan='2' id='weightbox' ><strong>Weekly Weigh-In: </strong><br><br><br><input type='text' /></td>";
		table = table + "</tr></tbody></table>";
		
		table = table + "<table><tbody>";
		table = table + "<tr>"+
			"<th>Day<span></span>Date</th>"+
			"<th>Sunday<span></span>"+data.dates[0]+"</th>"+
			"<th>Monday<span></span>"+data.dates[1]+"</th>"+
			"<th>Tuesday<span></span>"+data.dates[2]+"</th>"+
			"<th>Wednesday<span></span>"+data.dates[3]+"</th>"+
			"<th>Thursday<span></span>"+data.dates[4]+"</th>"+
			"<th>Friday<span></span>"+data.dates[5]+"</th>"+
			"<th>Saturday<span></span>"+data.dates[6]+"</th>";
		table = table + "</tr>";

		data.meals.map(function(m){

			table = table + "<tr><td class='middlized'>"+m.title+"</td>";
			m.meals.map(function(bf){
				
				var meal = getFromJSON(lists[m.title.toLowerCase()],bf);
				
				table = table + 
				"<td class='toTop'><div class='progress'>" +
				"<input type='checkbox' name='' value=''>"+
				"yes</span>" +
				"<input type='checkbox' name='' value=''>"+
				"<span>no</span></div>"+
				"[" + meal.id + "]" +
				meal.description + 
				"</td>";
			});

			table = table + "</tr>";
			
		});
		
			table = table + "<tr><td>Snacks</td><td colspan=8>";
			data.snacks.map(function(s){
				
				var snack = getFromJSON(lists.snack, s);
				
				table = table + "<span class='snack-spacer'></span>[#" + snack.id + "]" + snack.description;
			});

			table = table + "</td></tr>";
			
			///Excercise: 
			
			table = table + "<td class='fixedSize'>Excercise (activity + time)</td>" +
			"<td class='fixedSize  toTop'><div class='progress'>" +
				"<input type='checkbox' name='' value=''>"+
				"yes</span>" +
				"<input type='checkbox' name='' value=''>"+
				"<span>no</span></div></td>" + 
			"<td class='fixedSize toTop'><div class='progress'>" +
				"<input type='checkbox' name='' value=''>"+
				"yes</span>" +
				"<input type='checkbox' name='' value=''>"+
				"<span>no</span></div></td>" + 
						"<td class='fixedSize toTop'><div class='progress'>" +
				"<input type='checkbox' name='' value=''>"+
				"yes</span>" +
				"<input type='checkbox' name='' value=''>"+
				"<span>no</span></div></td>" + 
						"<td class='fixedSize toTop'><div class='progress'>" +
				"<input type='checkbox' name='' value=''>"+
				"yes</span>" +
				"<input type='checkbox' name='' value=''>"+
				"<span>no</span></div></td>" + 
						"<td class='fixedSize toTop'><div class='progress'>" +
				"<input type='checkbox' name='' value=''>"+
				"yes</span>" +
				"<input type='checkbox' name='' value=''>"+
				"<span>no</span></div></td>" + 
						"<td class='fixedSize toTop'><div class='progress'>" +
				"<input type='checkbox' name='' value=''>"+
				"yes</span>" +
				"<input type='checkbox' name='' value=''>"+
				"<span>no</span></div></td>" + 
				"<td class='fixedSize toTop'><div class='progress'>" +
				"<input type='checkbox' name='' value=''>"+
				"yes</span>" +
				"<input type='checkbox' name='' value=''>"+
				"<span>no</span></div></td>";
			
		/////end
		table = table + "</tbody></table>";
		
		//if(data.shopping[0] !== undefined){
		
			//Grocery List Begin
			table = table + "<div class='top-of-page'></div><h1>Grocery Check-list</h1><p><strong>Instructions: </strong> Take inventory of what is at the house already before shopping.</p>";
			
			/////temp
			/*table = table + "<table>";
			table = table + "<tr><th width='20%'>Quantity</th><th width='80%'>Description</th></tr>";
			
			for(var i=0; i <20; i++){
				table = table + "<tr><td  height='36px'>&nbsp;</td><td>&nbsp;</td></tr>";
			}
			table = table + "</table>";
			*//////temp
			
			data.shopping.map(function(i){
				
				var item = getFromJSON(lists.shopping, i.item);

				table = table + "<p>";
				table = table + "<input type='checkbox' name='' value=''>";
				table = table + "[" + i.qty + "] x's " + item.description + "</p>";
				
			});
		//}
	});
	
	//Excercise Ideas List Begin
	table = table + "<div class='top-of-page'></div><h1>Excercise Tips</h1>";
	
	table = table + "<ol>";
	
	lists.excerciseTips.map(function(ex){
		
		table = table + "<ul>"+ ex +"</ul>";
		
	});	
	
	table = table + "</ol>";
	

	
lists_names.map(function(meal){
	table = table + "<div class='top-of-page'></div><h1>"+meal.charAt(0).toUpperCase()+meal.slice(1)+" List</h1><p><strong style='display:none;'>Notes: </strong></p><p></p>";
	
		lists[meal].map(function(b){
			if(b.description !== ''){
				table = table + "<p class='showAllDB'><strong>";
				table = table + b.id + " -- ";
				table = table + b.description.split('<hr>').join(' ');
				table = table + "</strong></p>";
				if(b.tips !== ''){
					table = table + "<p>TIPS: ";
					table = table + b.tips;
					table = table + "</p>";
				}
			}
		});
});
	
	
	document.getElementById('target').innerHTML = table;
		
		////////////////////////////////////////////////////
		////////////////////////////////////////////////////
});