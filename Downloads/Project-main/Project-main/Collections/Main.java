import java.util.ArrayList;
import java.util.Iterator;
import java.util.Comparator;

class Student{

    private int id;
    private String name;
    private String city;

    Student(int id, String name, String city) {
        this.id = id;
        this.name = name;
        this.city = city;
    }

    

    public String toString() {
        return "Student Details: " + id + ", " + name + ", " + city;
    }

    
}

public class Main {

    public static void main(String[] args) {

        ArrayList<Student> sList = new ArrayList<>();

        sList.add(new Student(1, "xyz", "Nashik"));
        sList.add(new Student(6, "tuv", "Pune"));
        sList.add(new Student(5, "abc", "Mumbai"));
        sList.add(new Student(2, "efg", "Nashik"));

       


        
        Iterator<Student> it = sList.iterator();

        while (it.hasNext()) {
            System.out.println(it.next());
        }
    }
}