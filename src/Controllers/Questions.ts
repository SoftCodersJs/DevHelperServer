import { Request, Response } from "express";
import database from "../database";

interface questions_has_skills {
  questions_id: number;
  skills_id: number;
}

interface questions {
  id: number;
  title: string;
  content: string;
  likes: number;
  user_id: number;
}

export default class Questions {
  async create(req: Request, res: Response) {
    const { title, content, skills_id } = req.body;

    if (!title || !content || !skills_id) {
      return res.status(400).json({ message: "Faltam dados" });
    }

    const question = <[number]>(
      await database("questions").insert({
        title,
        content,
        likes: 0,
        users_id: req.userId,
      })
    );

    await database("questions_has_skills").insert({
      questions_id: question[0],
      skills_id,
    });

    return res.json({
      idquestion: question[0],
      title,
      content,
      skills_id,
    });
  }

  async read(req: Request, res: Response) {
    const questions = await database("questions").select("*");

    return res.json(questions);
  }

  async readFilterSkill(req: Request, res: Response) {
    const skills = await database('user_has_skills').select('skills_id').where('users_id', req.userId);

    var questionsExcluded:number[] = []

    var skillUser: questions_has_skills[] = [];
    var questionUser:questions[] = []
    var responseUser:questions[] = []   

    for (let i = 0; i < skills.length; i++) {
      let idskill = skills[i].skills_id;

      const skilldb: questions_has_skills[] = await database(
        "questions_has_skills"
      )
        .select("*")
        .where({ skills_id: idskill })
        .limit(3);

      skillUser = [...skillUser, ...skilldb];

      skilldb.map(item => {
        questionsExcluded = [...questionsExcluded, item.questions_id]
      })

    }

    for (let i = 0; i < skillUser.length; i++) {
      const questiondb:questions = await database('questions').select('*').where({id:skillUser[i].questions_id}).first();
      questionUser = [...questionUser, questiondb]
    }

    const questions = await database('questions').select('*').whereNotIn('id', questionsExcluded)
    
    return res.json({ questions:[...questionUser, ...questions] });
  }
}
