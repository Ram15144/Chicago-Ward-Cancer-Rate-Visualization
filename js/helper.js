var App = App || {};

var helper = function()
{
	var self = this;
	
	//Loaing community area data from files
	self.readTextFile = function(file)
	{
		console.log(file);
		var data;
	    var rawFile = new XMLHttpRequest();
	    rawFile.open("GET", file, false);
	    rawFile.onreadystatechange = function ()
	    {
	        if(rawFile.readyState === 4)
	        {
	            if(rawFile.status === 200 || rawFile.status == 0)
	            {
	                var allText = rawFile.responseText;
	                data = allText;
	            }
	        }
	    }
		return data;
	    rawFile.send(null);
	}
	
	function find_ward_data()
	{
		if(button_submit == 0) // If submit is zero then it's the first time loading the data or it's the default input values
		{
			for(let i=1; i<=50;i++)
			{
				let deaths =0;
				//console.log(i);
				let ward_no = i.toString();
				for(let j=0;j<ward_block_data.wards[ward_no].length; j++)
				{
					//const { properties } = data.features[j];
					var cancer_deaths = ward_block_data.wards[ward_no][j].cancer_deaths;
					if(cancer_deaths != "NULL") 
						deaths = deaths + parseInt(cancer_deaths);
				}
				self.dict[ward_no] = deaths;
			}
		}
		else // When the user inputs differ data then submit becomes 1 indicating the need for redrawing the map
		{
			button_submit = 0;
			for(let i=1; i<=50;i++)
			{
				let deaths =0;
				let ward_no = i.toString();
				for(let j=0;j<ward_block_data.wards[ward_no].length; j++)
				{
					let pop_weight = parseFloat(ward_block_data.wards[ward_no][j].pop_weight);
					let comm_area = ward_block_data.wards[ward_no][j].comm_area;
					let cancer_deaths = self.ca_dict[comm_area] * pop_weight;
					if(cancer_deaths != "NULL") 
						deaths = deaths + parseFloat(cancer_deaths);
				}
				self.dict[ward_no] = Math.round(deaths);
			}
		}
		console.log(self.dict);
		load_cancer_data();
	}
	
	function getDeaths(data)
	{
		let number_of_deaths = 0;
		button_submit = 1;
		for(let j=0; j<data.length; j++)
		{
			
			if(cancerSiteGrp == 0)
			{
				if(age == 0)
				{
					if(year == 0)
					{
						// This case is taken care of before
					}
					else
					{
						if(data!="" && data[j][2] == year)
							number_of_deaths = number_of_deaths + 1;
					}
				}
				else
				{
					if(year == 0)
					{
						if(data!="" && data[j][5] == age)
							number_of_deaths = number_of_deaths + 1;
					}
					else
					{
						if(data!="" && data[j][2] == year && data[j][5] == age)
							number_of_deaths = number_of_deaths + 1;
					}
				}
			}
			else
			{
				if(age == 0)
				{
					if(year == 0)
					{
						if(data!="" && data[j][4] == cancerSiteGrp)
							number_of_deaths = number_of_deaths + 1;
					}
					else
					{
						if(data!="" && data[j][2] == year && data[j][4] == cancerSiteGrp)
							number_of_deaths = number_of_deaths + 1;
					}
				}
				else
				{
					if(year == 0)
					{
						if(data!="" && data[j][4] == cancerSiteGrp && data[j][5] == age)
							number_of_deaths = number_of_deaths + 1;
					}
					else
					{
						if(data!="" && data[j][2] == year && data[j][4] == cancerSiteGrp && data[j][5] == age)
							number_of_deaths = number_of_deaths + 1;
					}
				}							
			}
		}
		return number_of_deaths;
	}
	
	function calc_deaths()
	{	
		let comm_area = "";
		let file_name = "";
		
		if(cancerSiteGrp == 0 && age == 0 && year == 0)
		{
			button_submit = 0;
		}
		else
		{
			if(self.ca77[76] === undefined || self.ca77[76].length == 0)
			{	
				for(let i=0; i<77; i++)
				{
					comm_area = (i+1).toString();
					file_name = "./CA_DATA/community_data/"+comm_area+".txt";
					
					readTextFile(file_name);
					
					let data = community_area_data.split("\n");
					self.ca77[i] = data;
					
					self.ca_dict[comm_area] = getDeaths(data); // This dictionary holds the number of cancer deaths in each community area according to the given specifications
				}
			}
			else
			{
				for(let i=0; i<77; i++)
				{
					comm_area = (i+1).toString();
					
					self.ca_dict[comm_area] = getDeaths(self.ca77[i]); // This dictionary holds the number of cancer deaths in each community area according to the given specifications
				}
			}
		}
		
		// Now Calculating the number of deaths in each ward
		find_ward_data();
	}
	
}