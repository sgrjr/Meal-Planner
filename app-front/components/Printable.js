var MealPlanForm = React.createClass({
	
	getInitialState: function() {
		
		return {};
	  },
	
		mealPlanStyle : {
			width:"100%"
		},
		columnStyle : {
			border:"dotted gray 2px"
		},
	
	  componentDidMount: function() {
		
		var fileName = 'mealplanforms/example.json';
		
		$.ajax({
		  url: fileName,
		  dataType: 'json',
		  cache: false,
		  success: function(cachedBasket) {
			  
			this.setState({days: cachedBasket});
		  }.bind(this),
		  error: function(xhr, status, err) {
			console.error(this.props.source, status, err.toString());
		  }.bind(this)
		});
		
	  },
	
	preventDefault: function (event) {
		event.preventDefault();
	  },
	
	saveToServer : function(data_from_plan){
		
		var json_data = JSON.stringify(data_from_plan);
		
		$.ajax({
		  url: "/api/v1/mealplan",
		  method: "post",
		  dataType: 'json',
		  data: {"data": json_data},
		  cache: false,
		  success: function(data) {			  
			this.setState({days:data_from_plan});
			console.log(data);
		  }.bind(this),
		  error: function(xhr, status, err) {
			console.error("/api/v1/mealplan", status, err.toString());
		  }.bind(this)
		});
		
	},
	
	 drop: function (event) {

		event.preventDefault();

		var data;

		try {
		  data = JSON.parse(event.dataTransfer.getData('text'));
		} catch (e) {
		  // If the text data isn't parsable we'll just ignore it.
		  return;
		}
		var dayTime = JSON.parse("[" + event.target.attributes.data.value + "]");
		var day = dayTime[0];
		var time = dayTime[1];
		
		// Do something with the data		
		
		var newState = this.state;
		newState.days[day].times[time].meals.push(JSON.parse(data));
		this.setState(newState);
		
		this.setState({nutrients:this.calculateNutrition(this.state.days)});
		
		this.saveToServer(this.state.days);
		
	  },
	
  render: function() {
	
	var columnStyle = this.columnStyle;
	var preventDefault = this.preventDefault;
	var drop = this.drop;
	
    return (
		
		<table style={this.mealPlanStyle} >
		<thead>
				<tr>
					<td></td>
					<td>Breakfast</td>
					<td>Lunch</td>
					<td>Dinner</td>
					<td>Snack</td>
				</tr>
		</thead>
		<tbody>
			{this.state.days.map(function(day, i) {
				
				return <tr key={i}>
						
						<td width="100px" style={weekDayStyle}>{day.title}</td>
								
							{day.times.map(function(time,j) {
							
								return 	<td style={columnStyle} key={j}><RecipeBasket day={i} time={j} basketStyle={basketStyle} preventDefault={preventDefault} drop={drop} meals={time.meals}/></td>;
							})}
							
						<td style={weekDayStyle}><MiniNutrient data={nutrition[i]} /></td>
					</tr>;
				})}
			</tbody>
			<tfoot>
				<tr>

				</tr>
			</tfoot>
			
      </table>
    );
  }
});

/*
*******************************************************************
*/
ReactDOM.render(
	<div>
		<MealPlanForm />		
	</div>,
document.getElementById('example')
);