package <%= entityPackage %>;

import <%= entityPackage %>.<%= modelName %>;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface <%= modelName%>Repository extends MongoRepository<<%= modelName %>, String>{

}
