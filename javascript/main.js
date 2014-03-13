(function(root){

	var WT = root.WT = ( root.WT || {} );

	var View = WT.View = function (el) {
		this.$el = el;
	};

	View.prototype.render = function(data){
		var that = this;

		for (var i = 0; i < data.topics.length; i++){
			this.$el.append('<ul data-title-id =' + i + "><li class='title'>" + data.topics[i].topictitle)
			for (var j = 0; j < data.topics[i].responses.length; j++){
				var response = data.topics[i].responses[j]
				if (response.parentid == 0) {
					$('ul[data-title-id=' + i + ']')
					.append('<li data-post-id=' + response.id + '>' + response.posttext + 
						'<div class="author"><strong>Posted by: </strong>' + response.author + 
						'</div><div class="time">' + this.parseAge(response.age) + 
						'</div><a href="#">Reply</a>')
				} else if (response.parentid > 0) {
					$('li[data-post-id=' + response.parentid + ']')
					.append('<ul><li data-post-id=' + response.id + '>' + response.posttext + 
						'<div class="author"><strong>Posted by: </strong>' + response.author +
						'</div><div class="time">' + this.parseAge(response.age) +
						'</div><a href="#">Reply</a>')
				}
			}
		}
		$('.title').on("click", function(event){
			$(this).next('li').toggle()
		});

		$('a').on("click", function(event){
			event.preventDefault();
			$(this).replaceWith("<form><input type='text' placeholder='Username'><br><textarea placeholder='Post'></textarea>" +
				"<br><input type='submit' value='Post'></form>")
			$('form').on('submit', function(event){
				event.preventDefault();
				if (!event.target[0].value || !event.target[1].value) {
					alert("You must provide a username and/or post")
				} else {
					$(this).html("<ul><li>" + event.target[1].value +
															 '<div class="author"><strong>Posted by: </strong>' + event.target[0].value + 
															'</div><div class="time">' + that.parseAge(0))
				}
			})
		});

	};

	View.prototype.parseAge = function(string){
		var age = parseInt(string)

		var days = Math.floor(age/86400)
		var hours = Math.floor((age - days * 86400) / 3600)
		var minutes = Math.floor((age - days * 86400 - hours * 3600) / 60)
		var seconds = age - days * 86400 - hours * 3600 - minutes * 60

		return "Posted " + days + " days, " + hours + " hours, " + minutes + " minutes, and " 
							 + seconds + " seconds ago."
	}

	View.prototype.initialize = function(){
		var that = this;
		$.ajax({
			url: 'discussion.json',
			dataType: 'json',
			success: function(data){
				that.render(data)
			}
		})
	};
})(this);

