import java.util.*;

public class MazeGenerator {

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

	public static void generateMaze(int w, int h) {
		width = w*2+1;
		height = h*2+1;

		//input all walls for maze
		maze = new Node[height][width];
		for (int y = 0; y < height; y++) {
			for (int x = 0; x < width; x++) {
				Node node = new Node(WALL);
				node.y = y;
				node.x = x;
				maze[y][x] = node;

			}
		}

		//input all available squares
		HashSet<Node> unvisited = new HashSet<Node>();
		for (int y = 1; y < height-1; y++) {
			for (int x = 1; x < width-1; x++) {
				if ((x+y)%2==0 && x%2==1 && y%2==1) {
					maze[y][x].type = ROOM;
					unvisited.add(maze[y][x]);
				}
			}
		}

		//input start, bottom left corner
		int y = height-2;
		int x = 1;
		Node node = maze[y][x];
		node.visited = true;
		node.type = ROOM;

		/*
		Make the initial cell the current cell and mark it as visited
		While there are unvisited cells
			If the current cell has any neighbours which have not been visited
				Choose randomly one of the unvisited neighbours
				Push the current cell to the stack
				Remove the wall between the current cell and the chosen cell
				Make the chosen cell the current cell and mark it as visited
			Else if stack is not empty
				Pop a cell from the stack
				Make it the current cell
		*/
		Stack<Node> stack = new Stack<>();
		Node current = node;
		Random rand = new Random();
		while (!unvisited.isEmpty()) {
			ArrayList<Node> neighbors = findNeighbors(current.x, current.y);
			if (neighbors.size() > 0) {
				stack.push(current);
				unvisited.remove(current);
				int position = rand.nextInt(neighbors.size());
				Node neighbor = neighbors.get(position);
				if (current.x != neighbor.x) {
					if (current.x < neighbor.x) {
						maze[current.y][current.x+1].type = DOOR;
					} else {
						maze[current.y][current.x-1].type = DOOR;
					}
				} else {
					if (current.y < neighbor.y) {
						maze[current.y+1][current.x].type = DOOR;
					} else {
						maze[current.y-1][current.x].type = DOOR;
					}
				}
				current = neighbor;
				current.visited = true;
			} else if (!stack.empty()) {
				current = stack.pop();
			} else {
				break;
			}
		}
	}

	public static ArrayList<Node> findNeighbors(int x, int y) {
		ArrayList<Node> neighbors = new ArrayList<>();
		if (x > 2) {
			if (!maze[y][x-2].visited) {
				neighbors.add(maze[y][x-2]);
			}
		}

		if (x < width-3) {
			if (!maze[y][x+2].visited) {
				neighbors.add(maze[y][x+2]);
			}
		}

		if (y > 2) {
			if (!maze[y-2][x].visited) {
				neighbors.add(maze[y-2][x]);
			}
		}

		if (y < height-3) {
			if (!maze[y+2][x].visited) {
				neighbors.add(maze[y+2][x]);
			}
		}
		return neighbors;
	}

	public static void removeRandomWalls(int r) {
		Random rand = new Random();
		int num_walls = r;
		int counter = 0;
		while (counter < num_walls) {
			int y = (rand.nextInt(height-3))+1;
			int x = (rand.nextInt(width-3))+1;
			if (maze[y][x].type == WALL
					&& (y%2==0 && x%2==1) || (y%2==1 && x%2==0)) {
				maze[y][x].type = DOOR;
				counter++;
			}
		}
	}

	public static void printMaze() {
		for (int y = 0; y < height; y++) {
			for (int x = 0; x < width; x++) {
				String out = " ";
				switch(maze[y][x].type){
					case WALL:
						out = WALL+"\t";
						break;
					case DOOR:
						out = DOOR+"\t";
						break;
					case ROOM:
						out = ROOM+"\t";
						break;
					case HUMAN:
						out = HUMAN+"\t";
						break;
					case FIRE:
						out = FIRE+"\t";
						break;
					case BLOCKED:
						out = BLOCKED+"\t";
						break;
				}
				System.out.print(out);
			}
			System.out.println();
		}
	}

	public static void printMazeOneLine() {
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
		}
		System.out.println(" ");
	}

	public static void main(String[] args) {
			generateMaze(10,10);
			removeRandomWalls(10);
			//printMaze();
			printMazeOneLine();
	}
}
