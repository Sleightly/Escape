import java.util.*;

public class PathGenerator {

	public static final int MAZE_SIZE = 33;
	public static Node[][] maze;
	public static int width;
	public static int height;
	public static final int WALL = 0;
	public static final int ROOM = 1;
	public static final int HUMAN = 2;
	public static final int FIRE = 3;
	public static final int DOOR = 4;
	public static final int BLOCKED = 5;

	private static class Node {
		 private int type;
	   private boolean visited;
	   private int x;
	   private int y;
		 private int dist;

	    public Node(int type) {
				this.type = type;
				dist = -1;
	   }

	   public Node(int type, boolean visited) {
				this.type = type;
	      this.visited = visited;
				dist = -1;
	   }

		 public boolean isOpen(){
			switch (type){
				case WALL:
				case FIRE:
				case BLOCKED:
					return false;
			}
			 return true;
		 }
	}
	public static void printMaze() {
		for (int y = 0; y < height; y++) {
			for (int x = 0; x < width; x++) {
				String out = " ";
				switch(maze[y][x].type){
					case WALL:
						out = WALL+" ";
						break;
					case DOOR:
						out = DOOR+" ";
						break;
					case ROOM:
						out = ROOM+" ";
						break;
					case HUMAN:
						out = HUMAN+" ";
						break;
					case FIRE:
						out = FIRE+" ";
						break;
					case BLOCKED:
						out = BLOCKED+" ";
						break;
				}
				System.out.print(out);
			}
			System.out.print(" ");
		}
	}

	public static ArrayList<Node> findPath(int x, int y) {
		ArrayList<Node> neighbors = new ArrayList<>();
		if (x > 2) {
			if (maze[y][x-1].isOpen() && maze[y][x-2].type!=FIRE) {
				neighbors.add(maze[y][x-2]);
			}
		}

		if (x < width-3) {
			if (maze[y][x+1].isOpen() && maze[y][x+2].type!=FIRE) {
				neighbors.add(maze[y][x+2]);
			}
		}

		if (y > 2) {
			if (maze[y-1][x].isOpen() && maze[y-2][x].type!=FIRE) {
				neighbors.add(maze[y-2][x]);
			}
		}

		if (y < height-3) {
			if (maze[y+1][x].isOpen()&& maze[y+2][x].type!=FIRE) {
				neighbors.add(maze[y+2][x]);
			}
		}
		return neighbors;
	}

	public static void generatePaths(){
		Queue<Node> queue = new LinkedList<>();
		maze[1][width-2].dist = 0;
		maze[height-2][1].dist = 0;
		queue.add(maze[1][width-2]);
		queue.add(maze[height-2][1]);
		Node curr = null;

		while( !queue.isEmpty() ){
			curr = queue.remove();
			ArrayList<Node> neighbors = findPath(curr.x,curr.y);
			for( int i = 0; i< neighbors.size(); i++){
				Node neighb = neighbors.get(i);
				if(neighb.dist == -1){
					neighb.dist = curr.dist + 1;
					queue.add(neighb);
				}
			}
		}
	}

	public static void printPath() {
		for (int y = 0; y < height; y++) {
			for (int x = 0; x < width; x++) {
				//if(maze[y][x].isOpen() && maze[y][x].type!=DOOR){
					System.out.print(maze[y][x].dist+" ");
				//}else {
				//s	System.out.print(" ");
				//}
			}
		}
		System.out.println();
	}
	public static void loadGrid(int w, int h, String data){
		String[] chars = data.split("\\s");
		height = h*2+1;
		width = w*2+1;
		maze = new Node[height][width];
		int position = 0;
		for(int y = 0; y<height; y++){
			for(int x = 0; x<width; x++){
				while(chars[position].length()==0){
					position++;
				}
				int temp = Integer.parseInt(chars[position++]);
				maze[y][x] = new Node(temp);
				maze[y][x].x = x;
				maze[y][x].y = y;
			}
		}
	}

	public static void main(String[] args) {
		if(args.length == 1){
			loadGrid(10,10,args[0]);
			generatePaths();
			printPath();
		}
	}
}
