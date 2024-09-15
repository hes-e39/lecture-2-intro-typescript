import {
  addTwoNumbers,
  Admin,
  isAdmin,
  isUser,
  Person,
  sumArray,
  userGreetingMessage,
  type User,
} from "./homework";

describe("Homework 2", () => {
  test("addTwoNumbers - should add two numbers", () => {
    expect(addTwoNumbers(1, 2)).toBe(3);
  });

  test("addTwoNumbers - should return the number if only one is provided", () => {
    expect(addTwoNumbers(1)).toBe(1);
  });

  test("sumArray - should sum an array of numbers", () => {
    expect(sumArray([1, 2, "3", 4, 5])).toBe(15);
  });

  test("isAdmin - should return true if the user is an admin", () => {
    const admin: Admin = { name: "Tim", isAdmin: true, age: 30 };
    const user: User = { type: "user", name: "John", age: 10 };

    expect(isAdmin(admin)).toBe(true);
    expect(isAdmin(user)).toBe(false);
  });

  test("isUser - should return true if the user is an admin", () => {
    const user: User = { type: "user", name: "John", age: 10 };
    const admin: Admin = { name: "Tim", isAdmin: true, age: 30 };

    expect(isUser(user)).toBe(true);
    expect(isUser(admin)).toBe(false);
  });

  test("userGreetingMessage - should return a greeting message", () => {
    const user: User = { type: "user", name: "John", age: 10 };
    const admin: Admin = { name: "Tim", isAdmin: true, age: 30 };
    const person: Person = { name: "Beth", age: 27 };

    expect(userGreetingMessage(user)).toBe("Hello, John. You are a user.");
    expect(userGreetingMessage(admin)).toBe("Hello, Tim. You are an admin.");
    expect(userGreetingMessage(person)).toBe(
      "Hello, Beth. You do not have access."
    );
  });
});
