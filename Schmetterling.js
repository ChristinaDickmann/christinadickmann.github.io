var schmetterling = ( function() {

	function createVertexData(){
        var n = 32;
        var m = 32;

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

        var du = 1*Math.PI/n;
        var dv = 3*Math.PI/m;
        // Counter for entries in index array.
        var iLines = 0;
        var iTris = 0;
                
        for(var i=0, u=0; i <= n; i++, u += du) {
                    
            for(var j=0, v=0; j <= m; j++, v += dv){

                var iVertex = i*(m+1) + j;

                var y = v*Math.cos(2*v)*Math.sin(4*u)*Math.sin(2*u);
                var x = v*Math.cos(2*v)*Math.cos(u);
                var z = -v*Math.sqrt(Math.sin(0.25*v));

                // Set vertex positions.
                vertices[iVertex * 3] = 0.045*x + 1.25;
                vertices[iVertex * 3 + 1] = 0.045*y + 0.4;
                vertices[iVertex * 3 + 2] = 0.045*z+0.3;

                // Calc and set normals.
				var nx = Math.cos(u) * Math.cos(v);
				var ny = Math.cos(u) * Math.sin(v);
				var nz = Math.sin(u);
				normals[iVertex * 3] = nx;
				normals[iVertex * 3 + 1] = ny;
				normals[iVertex * 3 + 2] = nz;

                //Set Colors
                if(j==n)
                {
                    colors[iVertex * 4] = 255/255;
                    colors[iVertex * 4 + 1] = 255/255;
                    colors[iVertex * 4 + 2] = 255/255;
                    colors[iVertex * 4 + 3] = 1;
                }
                if (j<n)
                {
                    colors[iVertex * 4] = 135/255;
                    colors[iVertex * 4 + 1] = 206/255;
                    colors[iVertex * 4 + 2] = 255/255;
                    colors[iVertex * 4 + 3] = 1;
                }
                if (j<n-6)
                {
                    colors[iVertex * 4] = 170/255;
                    colors[iVertex * 4 + 1] = 170/255;
                    colors[iVertex * 4 + 2] = 255/255;
                    colors[iVertex * 4 + 3] = 1;
                }
						
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
