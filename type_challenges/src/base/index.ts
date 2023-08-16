enum NumberType {
  A,
  B,
  C = 7,
  D,
  E,
}
let a = NumberType.A;
let b = NumberType.B;
let c = NumberType.C;
let d = NumberType.D;
let e = NumberType.E;
console.log(a, b, c, d, e);
// 0 1 7 8 9
let a1 = NumberType[0];
let b1 = NumberType[1];
let c1 = NumberType[7];
let d1 = NumberType[8];
let e1 = NumberType[9];
console.log(a1, b1, c1, d1, e1);
// A B C D E

type A = { a: string };
type B = { b: string };
type AB = A & B;
const ab: AB = { a: "a", b: "b" };

interface A1 {
  a: string;
}
interface B1 {
  b: string;
}
type AB1 = A1 & B1;
const ab1: AB1 = { a: "a", b: "b" };

interface AB2 extends A1, B1 {}
const ab2: AB2 = { a: "a", b: "b" };

// 类型守卫： 是可执行运行时检查的一种表达式，用于确保该类型在一定的范围内
// in  typeof interfaceof is

const data = { a: 1, b: 2, c: 3 };
if ("a" in data) {
  console.log(data.a);
}

if (typeof data === "object") {
  console.log(data);
}

class Animal {
  public name: string;
  constructor(name: string) {
    this.name = name;
  }
}

class Cat extends Animal {
  public age: number;
  constructor(name: string, age: number) {
    super(name);
    this.age = age;
  }
}

const cat = new Cat("Tom", 2);
if (cat instanceof Cat) {
  console.log(cat.age);
}

function isCat(animal: Animal): animal is Cat {
  return (animal as Cat).age !== undefined;
}

type infoProps = string | number;
const info: infoProps = "info";

interface InfoInterface {
  name: string;
  info: infoProps;
  d?: number;
  readonly id: number;
  [key: string]: any;
}

const info2: InfoInterface = {
  name: "lison",
  info: "string",
  id: 1,
  c: true,
  d: 123,
};

interface Vegetables {
  color: string;
}
interface Tomato extends Vegetables {
  radius: number;
}

function identity<T>(arg: T): T {
  return arg;
}

const calcArray = <T, U>(name: T, age: U): { name: T; age: U } => {
  return { name, age };
};

const res = calcArray<string, number>("lison", 18);

interface Info<T> {
  name: T;
}

// T : type
// K : key
// V : value
// E : element

// extends

interface Props {
  length: number;
}

function test<T extends Props>(arg: T): number {
  return arg.length;
}

test({ length: 1 });
test("123");
test([1, 2, 3]);
// test(123);

const typeof_info = {
  name: "lison",
  age: 18,
};
type TypeofInfo = typeof typeof_info;
const getInfo = (info: TypeofInfo) => {
  return info.age;
};

type KeyofInfo = keyof TypeofInfo;

const partilInfo: Partial<TypeofInfo> = {
  // 可选
  name: "lison",
};

const requiredInfo: Required<InfoInterface> = {
  name: "",
  info: "",
  d: 0, // 可选 变成必选
  id: 0,
};

const readonlyInfo: Readonly<InfoInterface> = {
  name: "",
  info: "",
  id: 0,
};
// readonlyInfo.name = "lison"; // 无法为 'readonlyInfo' 创建 'name' 的属性。ts(2540)

type recordInfo = "name" | "age";
// Record<K extends keyof any, T> :将 K 中所有的属性的值转化为 T 类型。
const recordInfo: Record<recordInfo, InfoInterface> = {
  name: {
    name: "",
    info: "",
    id: 0,
  },
  age: {
    name: "",
    info: "",
    id: 0,
  },
};

// Pick<T, K extends keyof T>  将某个类型中的子属性挑出来，变成包含这个类型部分属性的子类型。

type PickInfo = Pick<InfoInterface, "name" | "info">;
const pickInfo: PickInfo = {
  name: "",
  info: "",
};

// Exclude<T, U> 将T类型中的U类型剔除。
type ExcludeInfo = Exclude<"name" | "info" | 1 | "id", "name" | "info">;
const excludeInfo: ExcludeInfo = "id";

// Extract<T, U> 提取T类型中可以赋值给U类型的类型。
type ExtractInfo = Extract<"name" | "info" | 1 | "id", "info">;
const extractInfo: ExtractInfo = "info";

// Omit<T, K extends keyof any> 从T类型中剔除一个属性。
type OmitInfo = Omit<PickInfo, "id">;
const omitInfo: OmitInfo = {
  info: "",
  name: "",
};
