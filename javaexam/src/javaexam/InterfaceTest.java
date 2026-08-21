package javaexam;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Optional;

public class InterfaceTest {
	public static void main(String[] args) {
		String user = "root";
		String guest = Optional.ofNullable(user).orElse("guest");
		System.out.println(guest);
		
		Date date = new Date();
		System.out.println(date);
		// 아래는 1월을 0으로 처리중 그래서 한달 전으로 출력됨
		System.out.println(date.getMonth()+1);
		
		// LocalDate.now()로 호출이 가능하니 now()는 static으로 정의되어있음
		LocalDate localDate = LocalDate.now();
		System.out.println(localDate.getMonthValue());
		
		List<String> list = List.of("Apple", "Orange", "Cherry");
		// 반복문 1
		for(String name : list) {
			System.out.println(name);
		}
		
		// 반복문2
		list.forEach(name -> System.out.println(name));
		
		// 반복문3
		list.forEach(System.out::println);
		
		// 반복문4
		for(int i = 0; i<list.size(); i++) {
			System.out.println(list.get(i));
		}
	}
	

}

interface MyInterface {
	// 함수선언
	void write();
	// 함수를 정의 static 으로 객체생성없이 사용가능
	static void get() {
		
	}
	// 함수 정의
	default void print() {
		
	}
}
