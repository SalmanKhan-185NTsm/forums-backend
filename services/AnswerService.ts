export default class TemplateService {
    prisma: any;
    constructor(prisma: any) {
      this.prisma = prisma;
    }
    addTemplate<T>(data: T) {}
    deleteTemplate<T>(data: T) {}
    findTemplateById<T>(data: T) {}
    updateTemplateById<T>(data: T) {}
  }
  