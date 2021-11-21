var tropfen = ( function() {

	function createVertexData(){
        //http://www.3d-meier.de/tut3/Seite44.html
        var n = 4;
        var m = 12;

        // Positions.
        this.vertices = new Float32Array(3 * (n+1) * (m+1));
        var vertices = this.vertices;
		// Normals.
		this.normals = new Float32Array(3 * (n + 1) * (m + 1));
		var normals = this.normals;
        // Index data.
		this.indicesLines = new Uint16Array(2 * 2 * n * m);
		var indicesLines = this.indicesLines;
		this.indicesTris = new Uint16Array(3 * 2 * n * m);
		var indicesTris = this.indicesTris;
        // Color data
        this.colors = new Float32Array(vertices.length * 3);
        var colors = this.colors;

        var du = Math.PI/n;
        var dv = 2*Math.PI/m;
        // Counter for entries in index array.
        var iLines = 0;
        var iTris = 0;

        for(var i=0, u=0; i <= n; i++, u += du) {
                    
            for(var j=0, v=0; j <= m; j++, v += dv){

                var iVertex = i*(m+1) + j;
                var a =0.8;
                var b = 2;

                var x = a*(b-Math.cos(u))*Math.sin(u)*Math.cos(v);
                var z = a*(b-Math.cos(u))*Math.sin(u)*Math.sin(v);
                var y = Math.cos(u);
                // Set vertex positions.
                vertices[iVertex * 3] = 0.15*x-1.25;
                vertices[iVertex * 3 + 1] = -0.15*y+0.8;
                vertices[iVertex * 3 + 2] = -0.15*z;

                // Calc and set normals.
				var nx = Math.cos(u) * Math.cos(v);
				var ny = Math.cos(u) * Math.sin(v);
				var nz = Math.sin(u);
				normals[iVertex * 3] = nx;
				normals[iVertex * 3 + 1] = ny;
				normals[iVertex * 3 + 2] = nz;

                //Set Colors
                    colors[iVertex * 4] = 238/255;
                    colors[iVertex * 4 + 1] = 0;
                    colors[iVertex * 4 + 2] = 0;
                    colors[iVertex * 4 + 3] = 1;
                if(j<6)
                    colors[iVertex * 4] = 205/255; 
						
				// Set index.
                if(j>0 && i>0){
                    indicesLines[iLines++] = iVertex - 1;
                    indicesLines[iLines++] = iVertex;
                }
                if(j>0 && i>0){
                    indicesLines[iLines++] = iVertex - (m+1);                            
                    indicesLines[iLines++] = iVertex;
                }
						
                // Set index.
                // Two Triangles.
                if(j>0 && i>0){
                    indicesTris[iTris++] = iVertex;
                    indicesTris[iTris++] = iVertex - 1;
                    indicesTris[iTris++] = iVertex - (m+1);
                    //        
                    indicesTris[iTris++] = iVertex - 1;
                    indicesTris[iTris++] = iVertex - (m+1) - 1;
                    indicesTris[iTris++] = iVertex - (m+1);    
                }
            }
        }
    }

	return {
		createVertexData : createVertexData
	}

}());
