import { Columm, Entity,DeleteDateColumn } from 'typeorm';

@Entity()
export class User {

	@Columm({primary: true, generated: true})
  id: number;
	
	@Columm()
  name: string;

	@Columm({unique: true, nullable: false})
  email: string;

	@Columm({nullable: false})
  password: string;

	@Columm({default: 'user'})
	rol: string;

	@DeleteDateColumn()
	deletedAt: Date;

}
