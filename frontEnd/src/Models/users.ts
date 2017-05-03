export class User{
	constructor(
		public _id: string,
		public name: string,
		public surname: string,
		public email: string,
		public password: string,
		public birthday: string,
		public phone: number,
		public role: string

	){}
}